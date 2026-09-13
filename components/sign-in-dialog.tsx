"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

import { SignInFields } from "@/components/sign-in-fields";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignInDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to Workbase</DialogTitle>
          <DialogDescription>
            Use the email and password for your organization workspace.
          </DialogDescription>
        </DialogHeader>
        <SignInFields autoFocus />
        <p className="text-center text-sm text-muted-foreground">
          New to Workbase?{" "}
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
