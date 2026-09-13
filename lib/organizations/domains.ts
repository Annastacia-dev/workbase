const DOMAIN_PATTERN =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

export function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split("?")[0]
    .replace(/\.$/, "");
}

export function parseOrganizationDomains(
  value: string
): { domains: string[] } | { error: string } {
  const domains = [
    ...new Set(
      value
        .split(/[\s,]+/)
        .map(normalizeDomain)
        .filter(Boolean)
    ),
  ];

  if (domains.length === 0) {
    return { error: "Add at least one company domain." };
  }

  const invalid = domains.find((domain) => !DOMAIN_PATTERN.test(domain));
  if (invalid) {
    return { error: `"${invalid}" is not a valid domain.` };
  }

  return { domains };
}

export function formatOrganizationDomains(domains: { domain: string }[]) {
  return domains.map((item) => item.domain).join(", ");
}
