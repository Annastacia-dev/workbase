"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AFRICAN_COUNTRIES,
  COMPANY_TYPES,
  INDUSTRIES,
  ORGANIZATION_SIZES,
  ORGANIZATION_STRUCTURES,
  TIMEZONES,
} from "@/lib/organizations/constants";
import type { OrganizationFormInput } from "@/lib/organizations/schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OrganizationFormSection =
  | "identity"
  | "footprint"
  | "domains"
  | "timezone";

type OrganizationProfileFieldsProps = {
  form: UseFormReturn<OrganizationFormInput>;
  canEdit?: boolean;
  sections?: OrganizationFormSection[];
};

export function OrganizationProfileFields({
  form,
  canEdit = true,
  sections = ["identity", "footprint", "domains", "timezone"],
}: OrganizationProfileFieldsProps) {
  const structure = form.watch("structure");
  const hqCountry = form.watch("country");
  const show = (section: OrganizationFormSection) => sections.includes(section);

  return (
    <div className="grid gap-6">
      {show("identity") ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Organization name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Holdings"
                    disabled={!canEdit}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company type</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!canEdit}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a company type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMPANY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!canEdit}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company size</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!canEdit}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="How many people?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORGANIZATION_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : null}

      {show("footprint") ? (
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="structure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company structure</FormLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ORGANIZATION_STRUCTURES.map((option) => {
                    const selected = field.value === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={!canEdit}
                        onClick={() => field.onChange(option.value)}
                        className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                          selected
                            ? "border-neutral-900 bg-neutral-950 text-white"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <span className="block text-sm font-medium">
                          {option.label}
                        </span>
                        <span
                          className={`mt-1 block text-sm ${
                            selected ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {option.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>
                  {structure === "MULTI_COUNTRY"
                    ? "Headquarters country"
                    : "Country"}
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!canEdit}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AFRICAN_COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {structure === "MULTI_COUNTRY" ? (
            <FormField
              control={form.control}
              name="countries"
              render={({ field }) => {
                const selected = new Set(
                  (field.value as string[] | undefined) ?? []
                );
                function toggle(code: string) {
                  if (code === hqCountry) {
                    return;
                  }
                  const next = new Set(selected);
                  if (next.has(code)) {
                    next.delete(code);
                  } else {
                    next.add(code);
                  }
                  field.onChange([...next]);
                }

                return (
                  <FormItem>
                    <FormLabel>Operating countries</FormLabel>
                    <FormDescription>
                      Headquarters is included. Choose every other country the
                      group operates in.
                    </FormDescription>
                    <div className="rounded-xl border p-4">
                      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {AFRICAN_COUNTRIES.map((country) => {
                          const isHq = country.value === hqCountry;
                          const checked = isHq || selected.has(country.value);
                          return (
                            <label
                              key={country.value}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                className="size-4 accent-neutral-950"
                                checked={checked}
                                disabled={!canEdit || isHq}
                                onChange={() => toggle(country.value)}
                              />
                              <span>
                                {country.label}
                                {isHq ? " · HQ" : ""}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ) : null}
        </div>
      ) : null}

      {show("domains") ? (
        <FormField
          control={form.control}
          name="domains"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company domains</FormLabel>
              <FormControl>
                <Input
                  placeholder="acme.co.ke, acme.com"
                  disabled={!canEdit}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                One or more email / web domains, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}

      {show("timezone") ? (
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!canEdit}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIMEZONES.map((timezone) => (
                    <SelectItem key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
    </div>
  );
}
