import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentMembership } from "@/lib/auth/get-current-org";
import { isSuperuser } from "@/lib/auth/superuser";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Waiting for access · Workbase",
};

export default async function PendingPage() {
  const result = await getCurrentMembership();

  if (!result) {
    redirect("/login");
  }

  if (await isSuperuser(result.user.id)) {
    redirect("/admin");
  }

  if (result.membership) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your account is ready</CardTitle>
          <CardDescription>
            A Workbase admin still needs to add you to an organization. You
            will be able to sign in to that workspace once they do.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Signed in as {result.user.email ?? "your account"}.
        </CardContent>
        <CardFooter>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
