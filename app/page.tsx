import Link from "next/link";
import {
  Banknote,
  Building2,
  CalendarDays,
  ShieldCheck,
  Users,
} from "lucide-react";

const nav = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
];

const tools = [
  { name: "Employees", hint: "People records", icon: Users, rotate: "-rotate-6 translate-y-8" },
  { name: "Leave", hint: "Approvals on time", icon: CalendarDays, rotate: "-rotate-3 translate-y-2" },
  {
    name: "Payroll",
    hint: "PAYE, NSSF and SHIF ready",
    icon: Banknote,
    featured: true,
    rotate: "translate-y-0",
  },
  { name: "Organization", hint: "One tenant workspace", icon: Building2, rotate: "rotate-3 translate-y-2" },
  { name: "Compliance", hint: "Kenyan statutory filings", icon: ShieldCheck, rotate: "rotate-6 translate-y-8" },
];

const features = [
  {
    title: "Payroll that knows Kenya",
    body: "Run PAYE, NSSF, and SHIF in the same workspace as your people records — without exporting to a spreadsheet.",
  },
  {
    title: "Leave without the email chain",
    body: "Balances, approvals, and public holidays live with the employee. Managers see what is pending in one place.",
  },
  {
    title: "One organization, clean isolation",
    body: "Every record is scoped to your company. Your admin sets up the workspace; your team just signs in.",
  },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
      <span className="relative inline-flex size-6 items-center justify-center rounded-md bg-neutral-950 text-[11px] text-white">
        W
        <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-rose-500" />
      </span>
      workbase
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 bg-neutral-100 p-3 md:p-4">
      <div className="relative flex min-h-[calc(100vh-1.5rem)] w-full flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-white md:min-h-[calc(100vh-2rem)] md:rounded-[2rem]">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-10">
          <BrandMark />
          <nav className="hidden items-center gap-7 text-sm text-neutral-500 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-neutral-950">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Get started
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <section
            id="product"
            className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-8 text-center md:pt-4"
          >
            <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-neutral-50 shadow-sm ring-1 ring-neutral-100">
              <Building2 className="size-4 text-neutral-500" />
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
              Payroll, leave, and people ops in one workspace
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-500">
              Workbase is HR software built for Kenyan organizations. Your admin
              sets up the company. You sign in and get to work.
            </p>

            <div className="mt-12 flex w-full max-w-3xl items-end justify-center gap-2 sm:mt-14 sm:gap-5 md:gap-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className={`flex flex-col items-center ${tool.rotate}`}
                  >
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl bg-neutral-50 shadow-sm ring-1 ring-black/5 sm:size-16 md:size-[4.5rem] ${
                        tool.featured ? "ring-black/10 shadow-md" : ""
                      }`}
                    >
                      <Icon
                        className={`size-5 sm:size-7 md:size-8 ${
                          tool.featured ? "text-neutral-950" : "text-neutral-400"
                        }`}
                      />
                    </div>
                    {tool.featured ? (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-neutral-950">
                          {tool.name}
                        </p>
                        <p className="text-xs text-neutral-400">{tool.hint}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="features" className="mx-auto w-full max-w-5xl px-6 pb-20">
            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl bg-neutral-50 px-5 py-6 text-left ring-1 ring-black/5"
                >
                  <h2 className="text-base font-semibold tracking-tight text-neutral-950">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {feature.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="pricing"
            className="mx-auto w-full max-w-3xl px-6 pb-20 text-center"
          >
            <p className="text-sm font-medium text-neutral-400">Pricing</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
              Workspaces are set up by your admin
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
              Sign in if you already have access. New teammates can create an
              account and wait to be added to their organization.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-10 items-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Sign in
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
