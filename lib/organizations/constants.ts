export const INDUSTRIES = [
  "Agriculture",
  "Manufacturing",
  "Financial Services",
  "ICT / Technology",
  "Healthcare",
  "Education",
  "Retail & Wholesale",
  "Hospitality & Tourism",
  "Construction",
  "Transport & Logistics",
  "Professional Services",
  "NGO / Nonprofit",
  "Energy & Utilities",
  "Real Estate",
  "Other",
] as const;

export const ORGANIZATION_SIZES = [
  { value: "MICRO", label: "Micro (1–9 people)" },
  { value: "SMALL", label: "Small (10–49 people)" },
  { value: "MEDIUM", label: "Medium (50–249 people)" },
  { value: "LARGE", label: "Large (250+ people)" },
] as const;

export const TIMEZONES = [
  { value: "Africa/Nairobi", label: "Africa/Nairobi (EAT)" },
  { value: "Africa/Dar_es_Salaam", label: "Africa/Dar es Salaam" },
  { value: "Africa/Kampala", label: "Africa/Kampala" },
  { value: "Africa/Addis_Ababa", label: "Africa/Addis Ababa" },
  { value: "Africa/Johannesburg", label: "Africa/Johannesburg (SAST)" },
  { value: "UTC", label: "UTC" },
] as const;
