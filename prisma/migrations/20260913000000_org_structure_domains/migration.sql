-- AlterEnum
CREATE TYPE "OrganizationStructure" AS ENUM ('SINGLE_COUNTRY', 'MULTI_COUNTRY');

CREATE TYPE "CompanyType" AS ENUM (
  'PRIVATE_LIMITED',
  'PUBLIC_LIMITED',
  'SOLE_PROPRIETORSHIP',
  'PARTNERSHIP',
  'LIMITED_LIABILITY_PARTNERSHIP',
  'BRANCH',
  'HOLDING',
  'SUBSIDIARY',
  'NGO',
  'COOPERATIVE',
  'GOVERNMENT',
  'OTHER'
);

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN "companyType" "CompanyType";
ALTER TABLE "Organization" ADD COLUMN "structure" "OrganizationStructure" NOT NULL DEFAULT 'SINGLE_COUNTRY';
ALTER TABLE "Organization" ADD COLUMN "countries" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "Organization"
SET "countries" = ARRAY["country"]
WHERE cardinality("countries") = 0 AND "country" IS NOT NULL;

-- CreateTable
CREATE TABLE "OrganizationDomain" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationDomain_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OrganizationDomain_organizationId_domain_key" ON "OrganizationDomain"("organizationId", "domain");
CREATE INDEX "OrganizationDomain_organizationId_idx" ON "OrganizationDomain"("organizationId");
CREATE INDEX "OrganizationDomain_domain_idx" ON "OrganizationDomain"("domain");

ALTER TABLE "OrganizationDomain" ADD CONSTRAINT "OrganizationDomain_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RLS
ALTER TABLE "OrganizationDomain" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrganizationDomain" FORCE ROW LEVEL SECURITY;

CREATE POLICY "organization_domains_select_member"
  ON "OrganizationDomain"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM "User"
      WHERE "User".id::text = public.current_app_user_id()
        AND "User"."isSuperuser" = true
    )
    OR "organizationId" IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
    )
  );

CREATE POLICY "organization_domains_write_manager"
  ON "OrganizationDomain"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "User"
      WHERE "User".id::text = public.current_app_user_id()
        AND "User"."isSuperuser" = true
    )
    OR "organizationId" IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
        AND role IN ('OWNER', 'ADMIN')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM "User"
      WHERE "User".id::text = public.current_app_user_id()
        AND "User"."isSuperuser" = true
    )
    OR "organizationId" IN (
      SELECT "organizationId"
      FROM "Membership"
      WHERE "userId"::text = public.current_app_user_id()
        AND role IN ('OWNER', 'ADMIN')
    )
  );

GRANT ALL ON TABLE "OrganizationDomain" TO authenticated, service_role;
