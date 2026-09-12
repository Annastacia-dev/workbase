import type { Metadata } from "next";

import { getCurrentOrg } from "@/lib/auth/get-current-org";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard · Workbase",
};

export default async function DashboardPage() {
  const { organization, role } = await getCurrentOrg();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Welcome to {organization.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organization module is live. Employees, payroll, and leave will plug
          into this tenant next.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Current tenant</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1 text-sm">
            <p>
              <span className="text-muted-foreground">Slug:</span>{" "}
              {organization.slug}
            </p>
            <p>
              <span className="text-muted-foreground">Country:</span>{" "}
              {organization.country}
            </p>
            <p>
              <span className="text-muted-foreground">Timezone:</span>{" "}
              {organization.timezone}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your role</CardTitle>
            <CardDescription>Membership in this workspace</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium">{role.replaceAll("_", " ")}</p>
            <p className="mt-1 text-muted-foreground">
              Plan: {organization.subscriptionPlan}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
