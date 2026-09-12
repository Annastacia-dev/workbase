import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">Workbase</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-16">
        <p className="text-sm font-medium text-muted-foreground">
          HR for Kenyan teams
        </p>
        <h1 className="font-heading max-w-xl text-4xl font-semibold tracking-tight">
          Payroll, leave, and people ops in one workspace.
        </h1>
        <p className="max-w-lg text-base leading-7 text-muted-foreground">
          Workbase is a multi-tenant HR platform. Sign in to the organization
          your admin has set up for you.
        </p>
        <div>
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
