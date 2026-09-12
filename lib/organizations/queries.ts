import "server-only";

import { getCurrentOrg } from "@/lib/auth/get-current-org";

export async function getOrganization() {
  const { organization, role, membership, user } = await getCurrentOrg();

  return {
    organization,
    role,
    membership,
    user,
  };
}
