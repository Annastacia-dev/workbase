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

export const ORGANIZATION_STRUCTURES = [
  {
    value: "SINGLE_COUNTRY",
    label: "Single-country company",
    description: "Operates in one country.",
  },
  {
    value: "MULTI_COUNTRY",
    label: "Group company",
    description: "A group or holding with operations in multiple countries.",
  },
] as const;

export const COMPANY_TYPES = [
  { value: "PRIVATE_LIMITED", label: "Private limited company" },
  { value: "PUBLIC_LIMITED", label: "Public limited company" },
  { value: "SOLE_PROPRIETORSHIP", label: "Sole proprietorship" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "LIMITED_LIABILITY_PARTNERSHIP", label: "Limited liability partnership" },
  { value: "BRANCH", label: "Branch of a foreign company" },
  { value: "HOLDING", label: "Holding / group parent" },
  { value: "SUBSIDIARY", label: "Subsidiary" },
  { value: "NGO", label: "NGO / nonprofit" },
  { value: "COOPERATIVE", label: "Cooperative" },
  { value: "GOVERNMENT", label: "Government / parastatal" },
  { value: "OTHER", label: "Other" },
] as const;

export const AFRICAN_COUNTRIES = [
  { value: "DZ", label: "Algeria", timezone: "Africa/Algiers" },
  { value: "AO", label: "Angola", timezone: "Africa/Luanda" },
  { value: "BJ", label: "Benin", timezone: "Africa/Porto-Novo" },
  { value: "BW", label: "Botswana", timezone: "Africa/Gaborone" },
  { value: "BF", label: "Burkina Faso", timezone: "Africa/Ouagadougou" },
  { value: "BI", label: "Burundi", timezone: "Africa/Bujumbura" },
  { value: "CM", label: "Cameroon", timezone: "Africa/Douala" },
  { value: "CV", label: "Cabo Verde", timezone: "Atlantic/Cape_Verde" },
  { value: "CF", label: "Central African Republic", timezone: "Africa/Bangui" },
  { value: "TD", label: "Chad", timezone: "Africa/Ndjamena" },
  { value: "KM", label: "Comoros", timezone: "Indian/Comoro" },
  { value: "CG", label: "Congo", timezone: "Africa/Brazzaville" },
  { value: "CD", label: "DR Congo", timezone: "Africa/Kinshasa" },
  { value: "CI", label: "Côte d’Ivoire", timezone: "Africa/Abidjan" },
  { value: "DJ", label: "Djibouti", timezone: "Africa/Djibouti" },
  { value: "EG", label: "Egypt", timezone: "Africa/Cairo" },
  { value: "GQ", label: "Equatorial Guinea", timezone: "Africa/Malabo" },
  { value: "ER", label: "Eritrea", timezone: "Africa/Asmara" },
  { value: "SZ", label: "Eswatini", timezone: "Africa/Mbabane" },
  { value: "ET", label: "Ethiopia", timezone: "Africa/Addis_Ababa" },
  { value: "GA", label: "Gabon", timezone: "Africa/Libreville" },
  { value: "GM", label: "Gambia", timezone: "Africa/Banjul" },
  { value: "GH", label: "Ghana", timezone: "Africa/Accra" },
  { value: "GN", label: "Guinea", timezone: "Africa/Conakry" },
  { value: "GW", label: "Guinea-Bissau", timezone: "Africa/Bissau" },
  { value: "KE", label: "Kenya", timezone: "Africa/Nairobi" },
  { value: "LS", label: "Lesotho", timezone: "Africa/Maseru" },
  { value: "LR", label: "Liberia", timezone: "Africa/Monrovia" },
  { value: "LY", label: "Libya", timezone: "Africa/Tripoli" },
  { value: "MG", label: "Madagascar", timezone: "Indian/Antananarivo" },
  { value: "MW", label: "Malawi", timezone: "Africa/Blantyre" },
  { value: "ML", label: "Mali", timezone: "Africa/Bamako" },
  { value: "MR", label: "Mauritania", timezone: "Africa/Nouakchott" },
  { value: "MU", label: "Mauritius", timezone: "Indian/Mauritius" },
  { value: "MA", label: "Morocco", timezone: "Africa/Casablanca" },
  { value: "MZ", label: "Mozambique", timezone: "Africa/Maputo" },
  { value: "NA", label: "Namibia", timezone: "Africa/Windhoek" },
  { value: "NE", label: "Niger", timezone: "Africa/Niamey" },
  { value: "NG", label: "Nigeria", timezone: "Africa/Lagos" },
  { value: "RW", label: "Rwanda", timezone: "Africa/Kigali" },
  { value: "ST", label: "São Tomé and Príncipe", timezone: "Africa/Sao_Tome" },
  { value: "SN", label: "Senegal", timezone: "Africa/Dakar" },
  { value: "SC", label: "Seychelles", timezone: "Indian/Mahe" },
  { value: "SL", label: "Sierra Leone", timezone: "Africa/Freetown" },
  { value: "SO", label: "Somalia", timezone: "Africa/Mogadishu" },
  { value: "ZA", label: "South Africa", timezone: "Africa/Johannesburg" },
  { value: "SS", label: "South Sudan", timezone: "Africa/Juba" },
  { value: "SD", label: "Sudan", timezone: "Africa/Khartoum" },
  { value: "TZ", label: "Tanzania", timezone: "Africa/Dar_es_Salaam" },
  { value: "TG", label: "Togo", timezone: "Africa/Lome" },
  { value: "TN", label: "Tunisia", timezone: "Africa/Tunis" },
  { value: "UG", label: "Uganda", timezone: "Africa/Kampala" },
  { value: "ZM", label: "Zambia", timezone: "Africa/Lusaka" },
  { value: "ZW", label: "Zimbabwe", timezone: "Africa/Harare" },
] as const;

export const TIMEZONES = [
  { value: "Africa/Nairobi", label: "Africa/Nairobi (EAT)" },
  { value: "Africa/Lagos", label: "Africa/Lagos (WAT)" },
  { value: "Africa/Accra", label: "Africa/Accra (GMT)" },
  { value: "Africa/Cairo", label: "Africa/Cairo (EET)" },
  { value: "Africa/Johannesburg", label: "Africa/Johannesburg (SAST)" },
  { value: "Africa/Dar_es_Salaam", label: "Africa/Dar es Salaam (EAT)" },
  { value: "Africa/Kampala", label: "Africa/Kampala (EAT)" },
  { value: "Africa/Addis_Ababa", label: "Africa/Addis Ababa (EAT)" },
  { value: "Africa/Kigali", label: "Africa/Kigali (CAT)" },
  { value: "Africa/Casablanca", label: "Africa/Casablanca (WET)" },
  { value: "UTC", label: "UTC" },
] as const;

export function countryLabel(code: string) {
  return AFRICAN_COUNTRIES.find((country) => country.value === code)?.label ?? code;
}

export function countryTimezone(code: string) {
  return (
    AFRICAN_COUNTRIES.find((country) => country.value === code)?.timezone ??
    "Africa/Nairobi"
  );
}

export function structureLabel(value: string) {
  return (
    ORGANIZATION_STRUCTURES.find((item) => item.value === value)?.label ?? value
  );
}

export function companyTypeLabel(value: string) {
  return COMPANY_TYPES.find((item) => item.value === value)?.label ?? value;
}
