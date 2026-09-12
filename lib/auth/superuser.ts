import "server-only";

import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const SUPERUSER_EMAIL = "admin@workplace.com";

export async function isSuperuser(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: { isSuperuser: true },
  });

  return profile?.isSuperuser === true;
}

export async function requireSuperuser() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/login");
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!profile?.isSuperuser) {
    redirect("/dashboard");
  }

  return { user, profile };
}
