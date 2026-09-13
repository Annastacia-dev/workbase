import type { Metadata } from "next";
import Link from "next/link";

import { listOrganizations } from "@/lib/organizations/admin-queries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Organizations · Workbase Admin",
};

export default async function AdminHomePage() {
  const organizations = await listOrganizations();

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Organizations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and review tenant workspaces. Members join after you set
            them up.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/organizations/new">New organization</Link>
        </Button>
      </div>

      {organizations.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No organizations yet</CardTitle>
            <CardDescription>
              Create the first tenant workspace to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-3">
          {organizations.map((organization) => (
            <Card key={organization.id}>
              <CardHeader>
                <CardTitle>{organization.name}</CardTitle>
                <CardDescription>
                  <span className="font-mono">{organization.slug}</span>
                  {organization.industry ? ` · ${organization.industry}` : ""}
                  {organization.size ? ` · ${organization.size}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {organization._count.memberships} member
                {organization._count.memberships === 1 ? "" : "s"} ·{" "}
                {organization.country} · {organization.subscriptionPlan}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
