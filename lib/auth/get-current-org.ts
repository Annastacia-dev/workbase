import "server-only";

import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/auth/session";
import { isSuperuser } from "@/lib/auth/superuser";
import { prisma } from "@/lib/db/prisma";
import type { Membership, Organization, OrganizationDomain } from "@prisma/client";

export type CurrentOrganization = Organization & {
  domains: OrganizationDomain[];
};

export type CurrentOrgContext = {
  organization: CurrentOrganization;
  membership: Membership;
  role: Membership["role"];
  user: {
    id: string;
    email: string | null;
  };
};

export async function getCurrentMembership() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return null;
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: {
      organization: {
        include: { domains: { orderBy: { domain: "asc" } } },
      },
    },
  });

  if (!membership) {
    return { user, membership: null };
  }

  return { user, membership };
}

/**
 * Resolves the active organization from the authenticated session.
 * Never accepts a client-supplied organizationId.
 *
 * Import this from every future tenant-scoped module.
 */
export async function getCurrentOrg(): Promise<CurrentOrgContext> {
  const result = await getCurrentMembership();

  if (!result) {
    redirect("/login");
  }

  if (await isSuperuser(result.user.id)) {
    redirect("/admin");
  }

  if (!result.membership) {
    redirect("/pending");
  }

  return {
    organization: result.membership.organization,
    membership: result.membership,
    role: result.membership.role,
    user: result.user,
  };
}

export function canManageOrganization(role: Membership["role"]) {
  return role === "OWNER" || role === "ADMIN";
}
