ALTER TABLE "User" ADD COLUMN "isSuperuser" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "User_isSuperuser_idx" ON "User"("isSuperuser");

DROP POLICY IF EXISTS "organizations_insert_authenticated" ON "Organization";

CREATE POLICY "organizations_insert_superuser"
  ON "Organization"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM "User"
      WHERE "User".id::text = public.current_app_user_id()
        AND "User"."isSuperuser" = true
    )
  );
