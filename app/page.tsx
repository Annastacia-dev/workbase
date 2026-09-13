import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarDays,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

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

function FloatCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
      <div className="mb-2.5 flex items-center gap-2 text-[13px] font-medium text-neutral-900">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function Pill({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#f7f7f8] [background-image:linear-gradient(to_right,#ececee_1px,transparent_1px),linear-gradient(to_bottom,#ececee_1px,transparent_1px)] [background-size:48px_48px]">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <BrandMark />
        <Link
          href="/login"
          className="inline-flex h-10 items-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
        >
          Sign in
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-8 lg:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-cols-[260px_minmax(0,1fr)_260px] xl:gap-12">
        <aside className="hidden flex-col gap-4 lg:flex">
          <FloatCard
            icon={<Mail className="size-3.5 text-sky-600" />}
            title="Leave request"
          >
            <p className="text-[11px] text-neutral-400">From: jane@acme.co.ke</p>
            <p className="mt-1 text-[11px] text-neutral-400">Subject: Annual leave · 12–16 May</p>
            <p className="mt-2 text-xs leading-5 text-neutral-600">
              Hi, I would like to take leave next week. Coverage is arranged with
              Samuel.
            </p>
          </FloatCard>
          <FloatCard
            icon={<MessageCircle className="size-3.5 text-emerald-600" />}
            title="Approvals"
          >
            <p className="text-[11px] text-neutral-400">#people-ops</p>
            <p className="mt-2 text-xs leading-5 text-neutral-600">
              <span className="font-medium text-neutral-900">@mike</span> Can you
              approve Jane’s leave?
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-600">
              <span className="font-medium text-neutral-900">@sarah</span> On it,
              checking the balance.
            </p>
          </FloatCard>
          <FloatCard
            icon={<Banknote className="size-3.5 text-amber-600" />}
            title="Payroll run"
          >
            <p className="text-xs leading-5 text-neutral-600">
              March 2026 · 48 employees
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-900">KES 2.4M net</p>
          </FloatCard>
          <Pill
            icon={<CalendarDays className="size-3" />}
            label="Leave balances"
            className="bg-neutral-950 text-white"
          />
        </aside>

        <section className="flex flex-col items-center text-center">
          <h1 className="max-w-xl text-[2.5rem] font-semibold tracking-tight text-neutral-950 sm:text-5xl sm:leading-[1.05] md:text-[3.4rem]">
            Payroll is happening.
            <br />
            Are you still in Excel?
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-neutral-500">
            Workbase puts employees, leave, and Kenyan payroll in one workspace.
            Your admin sets up the company. You sign in and get to work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-md gap-3 text-left lg:hidden">
            <FloatCard
              icon={<CalendarDays className="size-3.5 text-sky-600" />}
              title="Leave request"
            >
              <p className="text-xs leading-5 text-neutral-600">
                Jane Wanjiku · Annual leave · 12–16 May
              </p>
            </FloatCard>
            <FloatCard
              icon={<Banknote className="size-3.5 text-amber-600" />}
              title="Payroll run"
            >
              <p className="text-xs leading-5 text-neutral-600">
                March 2026 · 48 employees · KES 2.4M net
              </p>
            </FloatCard>
          </div>
        </section>

        <aside className="hidden flex-col gap-4 lg:flex">
          <FloatCard
            icon={<Users className="size-3.5 text-violet-600" />}
            title="Employee"
          >
            <p className="text-[11px] text-neutral-400">Samuel Otieno</p>
            <p className="mt-1 text-xs leading-5 text-neutral-600">
              Software Engineer · Nairobi
            </p>
            <p className="mt-1 text-xs text-neutral-500">Started 4 Mar 2024</p>
          </FloatCard>
          <FloatCard
            icon={<Clock3 className="size-3.5 text-sky-600" />}
            title="Attendance"
          >
            <p className="text-[11px] text-neutral-400">Today · 18 present</p>
            <p className="mt-2 text-xs leading-5 text-neutral-600">
              2 on leave · 1 late clock-in
            </p>
          </FloatCard>
          <FloatCard
            icon={<Building2 className="size-3.5 text-rose-500" />}
            title="Statutory"
          >
            <p className="text-[11px] text-neutral-400">This month</p>
            <p className="mt-2 text-xs leading-5 text-neutral-600">
              PAYE, NSSF, and SHIF are ready for filing.
            </p>
          </FloatCard>
          <div className="flex flex-col gap-2">
            <Pill
              icon={<ShieldCheck className="size-3" />}
              label="PAYE, NSSF, SHIF"
              className="bg-neutral-950 text-white"
            />
            <Pill
              icon={<Banknote className="size-3" />}
              label="Built for Kenya"
              className="bg-violet-100 text-violet-800"
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
