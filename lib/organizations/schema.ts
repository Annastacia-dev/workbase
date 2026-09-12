import { z } from "zod";

export const organizationSizeSchema = z.enum([
  "MICRO",
  "SMALL",
  "MEDIUM",
  "LARGE",
]);

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters.")
    .max(100, "Organization name must be 100 characters or fewer."),
  industry: z.string().optional(),
  size: organizationSizeSchema.optional(),
});

export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters.")
    .max(100, "Organization name must be 100 characters or fewer."),
  industry: z.string().optional(),
  size: organizationSizeSchema.optional(),
  timezone: z
    .string()
    .trim()
    .min(1, "Choose a timezone.")
    .max(64, "Timezone is too long."),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;

export function emptyToUndefined(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
