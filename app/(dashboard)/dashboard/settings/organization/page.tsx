import type { Metadata } from "next";

import {
  canManageOrganization,
  getCurrentOrg,
} from "@/lib/auth/get-current-org";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OrganizationSettingsForm } from "./organization-settings-form";

export const metadata: Metadata = {
  title: "Organization settings · Workbase",
};

export default async function OrganizationSettingsPage() {
  const { organization, role } = await getCurrentOrg();
  const canEdit = canManageOrganization(role);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Organization settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          These details apply to everyone in this people operations workspace.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{organization.name}</CardTitle>
          <CardDescription>
            Slug <span className="font-mono">{organization.slug}</span> ·{" "}
            {organization.countries.length > 0
              ? organization.countries.join(", ")
              : organization.country}{" "}
            · {organization.subscriptionPlan}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationSettingsForm
            organization={organization}
            canEdit={canEdit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
