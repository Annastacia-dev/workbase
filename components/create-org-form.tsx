"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createOrganization } from "@/lib/organizations/actions";
import {
  companyTypeLabel,
  countryLabel,
  structureLabel,
} from "@/lib/organizations/constants";
import {
  createOrganizationSchema,
  type OrganizationFormInput,
} from "@/lib/organizations/schema";
import { OrganizationProfileFields } from "@/components/organization-profile-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const STEPS = [
  {
    id: "identity",
    title: "Profile",
    description: "Name and company type",
    fields: ["name", "companyType", "industry", "size"],
  },
  {
    id: "footprint",
    title: "Footprint",
    description: "Countries and structure",
    fields: ["structure", "country", "countries"],
  },
  {
    id: "domains",
    title: "Domains",
    description: "How the company is identified",
    fields: ["domains"],
  },
] as const;

export function CreateOrgForm() {
  const [step, setStep] = useState(0);
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string>();

  const form = useForm<OrganizationFormInput>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      companyType: undefined,
      structure: "SINGLE_COUNTRY",
      country: "KE",
      countries: [],
      domains: "",
      industry: undefined,
      size: undefined,
      timezone: "Africa/Nairobi",
    },
  });

  const values = form.watch();
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  async function goNext() {
    setFormError(undefined);
    const valid = await form.trigger([...current.fields], {
      shouldFocus: true,
    });
    if (valid) {
      setStep((currentStep) => currentStep + 1);
    }
  }

  function onSubmit(data: OrganizationFormInput) {
    setFormError(undefined);
    startTransition(async () => {
      const result = await createOrganization(data);
      if (result?.error) {
        setFormError(result.error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((item, index) => {
            const complete = index < step;
            const active = index === step;
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    active
                      ? "bg-neutral-950 text-white"
                      : complete
                        ? "bg-neutral-900 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      active || complete
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <OrganizationProfileFields
          form={form}
          sections={[current.id]}
        />

        {isLast ? (
          <div className="rounded-xl border bg-muted/30 p-4 text-sm">
            <p className="font-medium text-foreground">
              {values.name || "Untitled organization"}
            </p>
            <p className="mt-1 text-muted-foreground">
              {values.companyType
                ? companyTypeLabel(values.companyType)
                : "Company type not set"}{" "}
              · {structureLabel(values.structure)} ·{" "}
              {values.structure === "MULTI_COUNTRY"
                ? [values.country, ...(values.countries ?? [])]
                    .filter((code, index, list) => list.indexOf(code) === index)
                    .map(countryLabel)
                    .join(", ")
                : countryLabel(values.country)}
            </p>
            {values.domains ? (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {values.domains}
              </p>
            ) : null}
          </div>
        ) : null}

        {formError ? (
          <p className="text-sm text-destructive">{formError}</p>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0 || pending}
            onClick={() => {
              setFormError(undefined);
              setStep((currentStep) => currentStep - 1);
            }}
          >
            Back
          </Button>
          {isLast ? (
            <Button type="submit" disabled={pending}>
              {pending ? "Creating organization…" : "Create organization"}
            </Button>
          ) : (
            <Button type="button" onClick={goNext}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
