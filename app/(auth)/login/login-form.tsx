import Link from "next/link";

import { SignInFields } from "@/components/sign-in-fields";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to Workbase</CardTitle>
        <CardDescription>
          Use the email and password for your organization workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInFields />
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        New to Workbase?{" "}
        <Link href="/signup" className="ml-1 font-medium text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
      </CardFooter>
    </Card>
  );
}
