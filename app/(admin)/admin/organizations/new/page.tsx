import type { Metadata } from "next";
import Link from "next/link";

import { CreateOrgForm } from "@/components/create-org-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "New organization · Workbase Admin",
};

export default function NewOrganizationPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">All organizations</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New organization</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Create an organization</CardTitle>
          <CardDescription>
            This becomes the tenant boundary for people operations. Work through
            the company profile, countries, and domains before assigning
            members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateOrgForm />
        </CardContent>
      </Card>
    </div>
  );
}
