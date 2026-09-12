-- Defense-in-depth tenant isolation for Prisma + Supabase.
-- Policies honor either:
--   1. auth.uid() when the request uses the Supabase `authenticated` role
--   2. SET LOCAL app.current_user_id when Prisma sets a request session variable

CREATE OR REPLACE FUNCTION public.current_app_user_id()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    NULLIF(current_setting('app.current_user_id', true), ''),
    auth.uid()::text
  );
$$;

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Organization" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Organization" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Membership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Membership" FORCE ROW LEVEL SECURITY;

-- User / profile ----------------------------------------------------------
CREATE POLICY "users_select_own"
  ON "User"
  FOR SELECT
  USING (id::text = public.current_app_user_id());

CREATE POLICY "users_insert_own"
  ON "User"
  FOR INSERT
  WITH CHECK (id::text = public.current_app_user_id());

CREATE POLICY "users_update_own"
  ON "User"
  FOR UPDATE
  USING (id::text = public.current_app_user_id())
  WITH CHECK (id::text = public.current_app_user_id());

-- Membership --------------------------------------------------------------
CREATE POLICY "memberships_select_own"
  ON "Membership"
  FOR SELECT
  USING ("userId"::text = public.current_app_user_id());

CREATE POLICY "memberships_insert_own"
  ON "Membership"
  FOR INSERT
  WITH CHECK ("userId"::text = public.current_app_user_id());

-- Organization ------------------------------------------------------------
CREATE POLICY "organizations_select_member"
  ON "Organization"
  FOR SELECT
  USING (
    id IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
    )
  );

CREATE POLICY "organizations_insert_authenticated"
  ON "Organization"
  FOR INSERT
  WITH CHECK (public.current_app_user_id() IS NOT NULL);

CREATE POLICY "organizations_update_owner_admin"
  ON "Organization"
  FOR UPDATE
  USING (
    id IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
        AND role IN ('OWNER', 'ADMIN')
    )
  )
  WITH CHECK (
    id IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
        AND role IN ('OWNER', 'ADMIN')
    )
  );

-- Grants for PostgREST roles. Prisma connecting as `postgres` still bypasses
-- RLS (superuser). Use a non-superuser DATABASE_URL in production so these
-- policies are actually evaluated.
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE "User" TO authenticated, service_role;
GRANT ALL ON TABLE "Organization" TO authenticated, service_role;
GRANT ALL ON TABLE "Membership" TO authenticated, service_role;
GRANT SELECT ON TABLE "User" TO anon;
GRANT EXECUTE ON FUNCTION public.current_app_user_id() TO anon, authenticated, service_role;

-- Mirror Supabase Auth users into public."User"
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public."User" (id, email, "fullName")
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'fullName',
      split_part(COALESCE(NEW.email, 'user'), '@', 1)
    )
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        "fullName" = COALESCE(NULLIF(EXCLUDED."fullName", ''), public."User"."fullName");
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
