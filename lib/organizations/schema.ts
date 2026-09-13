import { z } from "zod";

import { AFRICAN_COUNTRIES } from "@/lib/organizations/constants";
import { parseOrganizationDomains } from "@/lib/organizations/domains";

export const organizationSizeSchema = z.enum([
  "MICRO",
  "SMALL",
  "MEDIUM",
  "LARGE",
]);

export const organizationStructureSchema = z.enum([
  "SINGLE_COUNTRY",
  "MULTI_COUNTRY",
]);

export const companyTypeSchema = z.enum([
  "PRIVATE_LIMITED",
  "PUBLIC_LIMITED",
  "SOLE_PROPRIETORSHIP",
  "PARTNERSHIP",
  "LIMITED_LIABILITY_PARTNERSHIP",
  "BRANCH",
  "HOLDING",
  "SUBSIDIARY",
  "NGO",
  "COOPERATIVE",
  "GOVERNMENT",
  "OTHER",
]);

const africanCountrySchema = z.enum(
  AFRICAN_COUNTRIES.map((country) => country.value) as [
    (typeof AFRICAN_COUNTRIES)[number]["value"],
    ...(typeof AFRICAN_COUNTRIES)[number]["value"][],
  ]
);

const organizationProfileFields = {
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters.")
    .max(100, "Organization name must be 100 characters or fewer."),
  companyType: companyTypeSchema,
  structure: organizationStructureSchema,
  country: africanCountrySchema,
  countries: z.array(africanCountrySchema).optional(),
  domains: z.string().trim().min(1, "Add at least one company domain."),
  industry: z.string().optional(),
  size: organizationSizeSchema.optional(),
};

function refineOrganizationProfile(
  data: {
    structure: z.infer<typeof organizationStructureSchema>;
    country: string;
    countries?: string[];
    domains: string;
  },
  ctx: z.RefinementCtx
) {
  const parsedDomains = parseOrganizationDomains(data.domains);
  if ("error" in parsedDomains) {
    ctx.addIssue({
      code: "custom",
      path: ["domains"],
      message: parsedDomains.error,
    });
  }

  if (data.structure === "MULTI_COUNTRY") {
    const countries = new Set(data.countries ?? []);
    countries.add(data.country);
    if (countries.size < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["countries"],
        message: "Select at least one other operating country.",
      });
    }
  }
}

export const organizationFormSchema = z
  .object({
    ...organizationProfileFields,
    timezone: z
      .string()
      .trim()
      .min(1, "Choose a timezone.")
      .max(64, "Timezone is too long.")
      .optional(),
  })
  .superRefine(refineOrganizationProfile);

export const createOrganizationSchema = organizationFormSchema;
export const updateOrganizationSchema = organizationFormSchema;

export type OrganizationFormInput = z.infer<typeof organizationFormSchema>;
export type CreateOrganizationInput = OrganizationFormInput;
export type UpdateOrganizationInput = OrganizationFormInput;

export function emptyToUndefined(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function resolveOperatingCountries(
  structure: z.infer<typeof organizationStructureSchema>,
  country: string,
  countries?: string[]
) {
  if (structure === "SINGLE_COUNTRY") {
    return [country];
  }

  return [...new Set([country, ...(countries ?? [])])];
}
