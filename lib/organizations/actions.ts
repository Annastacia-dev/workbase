"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  canManageOrganization,
  getCurrentOrg,
} from "@/lib/auth/get-current-org";
import { requireSuperuser } from "@/lib/auth/superuser";
import { withTenantContext } from "@/lib/db/tenant-context";
import { countryTimezone } from "@/lib/organizations/constants";
import { parseOrganizationDomains } from "@/lib/organizations/domains";
import {
  createOrganizationSchema,
  emptyToUndefined,
  resolveOperatingCountries,
  updateOrganizationSchema,
} from "@/lib/organizations/schema";
import { allocateUniqueSlug } from "@/lib/organizations/slug";

export type OrganizationActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createOrganization(
  values: unknown
): Promise<OrganizationActionState | void> {
  const { user } = await requireSuperuser();

  const parsed = createOrganizationSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const domains = parseOrganizationDomains(parsed.data.domains);
  if ("error" in domains) {
    return {
      error: domains.error,
      fieldErrors: { domains: [domains.error] },
    };
  }

  try {
    await withTenantContext(user.id, async (tx) => {
      const slug = await allocateUniqueSlug(tx, parsed.data.name);
      const countries = resolveOperatingCountries(
        parsed.data.structure,
        parsed.data.country,
        parsed.data.countries
      );

      await tx.organization.create({
        data: {
          name: parsed.data.name,
          slug,
          industry: emptyToUndefined(parsed.data.industry),
          size: parsed.data.size,
          companyType: parsed.data.companyType,
          structure: parsed.data.structure,
          country: parsed.data.country,
          countries,
          timezone: countryTimezone(parsed.data.country),
          domains: {
            create: domains.domains.map((domain) => ({ domain })),
          },
        },
      });
    });
  } catch {
    return {
      error: "Could not create the organization. Please try again.",
    };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateOrganization(
  values: unknown
): Promise<OrganizationActionState> {
  const { organization, role, user } = await getCurrentOrg();

  if (!canManageOrganization(role)) {
    return { error: "Only owners and admins can update organization settings." };
  }

  const parsed = updateOrganizationSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const domains = parseOrganizationDomains(parsed.data.domains);
  if ("error" in domains) {
    return {
      error: domains.error,
      fieldErrors: { domains: [domains.error] },
    };
  }

  try {
    await withTenantContext(user.id, async (tx) => {
      const countries = resolveOperatingCountries(
        parsed.data.structure,
        parsed.data.country,
        parsed.data.countries
      );

      await tx.organizationDomain.deleteMany({
        where: { organizationId: organization.id },
      });

      await tx.organization.update({
        where: { id: organization.id },
        data: {
          name: parsed.data.name,
          industry: emptyToUndefined(parsed.data.industry),
          size: parsed.data.size,
          companyType: parsed.data.companyType,
          structure: parsed.data.structure,
          country: parsed.data.country,
          countries,
          timezone: parsed.data.timezone ?? organization.timezone,
          domains: {
            create: domains.domains.map((domain) => ({ domain })),
          },
        },
      });
    });
  } catch {
    return { error: "Could not update the organization. Please try again." };
  }

  revalidatePath("/dashboard/settings/organization");
  revalidatePath("/dashboard");
  return {};
}
