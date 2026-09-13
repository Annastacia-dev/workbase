"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization, OrganizationDomain } from "@prisma/client";

import { updateOrganization } from "@/lib/organizations/actions";
import { formatOrganizationDomains } from "@/lib/organizations/domains";
import {
  updateOrganizationSchema,
  type OrganizationFormInput,
} from "@/lib/organizations/schema";
import { OrganizationProfileFields } from "@/components/organization-profile-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type OrganizationSettingsFormProps = {
  organization: Pick<
    Organization,
    | "name"
    | "industry"
    | "size"
    | "companyType"
    | "structure"
    | "country"
    | "countries"
    | "timezone"
  > & {
    domains: Pick<OrganizationDomain, "domain">[];
  };
  canEdit: boolean;
};

export function OrganizationSettingsForm({
  organization,
  canEdit,
}: OrganizationSettingsFormProps) {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();

  const form = useForm<OrganizationFormInput>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      name: organization.name,
      companyType: organization.companyType ?? undefined,
      structure: organization.structure,
      country: organization.country as OrganizationFormInput["country"],
      countries: organization.countries.filter(
        (code) => code !== organization.country
      ) as OrganizationFormInput["countries"],
      domains: formatOrganizationDomains(organization.domains),
      industry: organization.industry ?? undefined,
      size: organization.size ?? undefined,
      timezone: organization.timezone,
    },
  });

  function onSubmit(values: OrganizationFormInput) {
    setFormError(undefined);
    setFormSuccess(undefined);
    startTransition(async () => {
      const result = await updateOrganization(values);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      setFormSuccess("Organization settings saved.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <OrganizationProfileFields form={form} canEdit={canEdit} />
        {formError ? (
          <p className="text-sm text-destructive">{formError}</p>
        ) : null}
        {formSuccess ? (
          <p className="text-sm text-muted-foreground">{formSuccess}</p>
        ) : null}
        {canEdit ? (
          <Button type="submit" disabled={pending} className="w-fit">
            {pending ? "Saving…" : "Save changes"}
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Only owners and admins can edit these settings.
          </p>
        )}
      </form>
    </Form>
  );
}
