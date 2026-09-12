"use server";

import { redirect } from "next/navigation";

import { getCurrentMembership } from "@/lib/auth/get-current-org";
import { loginSchema, signupSchema } from "@/lib/auth/schema";
import { isSuperuser } from "@/lib/auth/superuser";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function signUp(
  values: unknown
): Promise<AuthActionState | void> {
  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user && !data.session) {
    return {
      message: "Check your email to confirm your account, then sign in.",
    };
  }

  if (data.user) {
    await prisma.user.upsert({
      where: { id: data.user.id },
      create: {
        id: data.user.id,
        email: parsed.data.email,
        fullName: parsed.data.fullName,
      },
      update: {
        email: parsed.data.email,
        fullName: parsed.data.fullName,
      },
    });
  }

  redirect("/pending");
}

export async function signIn(
  values: unknown
): Promise<AuthActionState | void> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  const membership = await getCurrentMembership();
  if (!membership) {
    redirect("/login");
  }

  if (await isSuperuser(membership.user.id)) {
    redirect("/admin");
  }

  redirect(membership.membership ? "/dashboard" : "/pending");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
