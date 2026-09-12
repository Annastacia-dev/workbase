import type { Prisma } from "@prisma/client";

export function slugifyOrganizationName(name: string) {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return slug || "org";
}

export function randomSlugSuffix() {
  return Math.random().toString(36).slice(2, 6);
}

export async function allocateUniqueSlug(
  tx: Prisma.TransactionClient,
  name: string
) {
  const base = slugifyOrganizationName(name);

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const slug = attempt === 0 ? base : `${base}-${randomSlugSuffix()}`;
    const existing = await tx.organization.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing) {
      return slug;
    }
  }

  return `${base}-${Date.now().toString(36)}`;
}
