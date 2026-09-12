"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@prisma/client";

import { updateOrganization } from "@/lib/organizations/actions";
import {
  INDUSTRIES,
  ORGANIZATION_SIZES,
  TIMEZONES,
} from "@/lib/organizations/constants";
import {
  updateOrganizationSchema,
  type UpdateOrganizationInput,
} from "@/lib/organizations/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

type OrganizationSettingsFormProps = {
  organization: Pick<
    Organization,
    "name" | "industry" | "size" | "timezone"
  >;
  canEdit: boolean;
};

export function OrganizationSettingsForm({
  organization,
  canEdit,
}: OrganizationSettingsFormProps) {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();

  const form = useForm<UpdateOrganizationInput>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      name: organization.name,
      industry: organization.industry ?? undefined,
      size: organization.size ?? undefined,
      timezone: organization.timezone,
    },
  });

  function onSubmit(values: UpdateOrganizationInput) {
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input disabled={!canEdit} {...field} />
              </FormControl>
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
