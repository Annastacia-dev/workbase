import "server-only";

import { requireSuperuser } from "@/lib/auth/superuser";
import { prisma } from "@/lib/db/prisma";

export async function listOrganizations() {
  await requireSuperuser();

  return prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      domains: { orderBy: { domain: "asc" } },
      _count: { select: { memberships: true } },
    },
  });
}
