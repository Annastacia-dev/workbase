"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { signUp } from "@/lib/auth/actions";
import { signupSchema, type SignupInput } from "@/lib/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string>();
  const [formMessage, setFormMessage] = useState<string>();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignupInput) {
    setFormError(undefined);
    setFormMessage(undefined);
    startTransition(async () => {
      const result = await signUp(values);
      if (result?.error) {
        setFormError(result.error);
      }
      if (result?.message) {
        setFormMessage(result.message);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your Workbase account</CardTitle>
        <CardDescription>
          Start a 14-day trial for your people operations workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Wanjiku" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane@company.co.ke"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError ? (
              <p className="text-sm text-destructive">{formError}</p>
            ) : null}
            {formMessage ? (
              <p className="text-sm text-muted-foreground">{formMessage}</p>
            ) : null}
            <Button type="submit" disabled={pending}>
              {pending ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="ml-1 font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
