import { Link } from "react-router-dom";
import { Shield, Zap, Lock, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import type { ReactNode } from "react";

export type AuthSplitMode = "login" | "signup";

type AuthSplitLayoutProps = {
  mode: AuthSplitMode;
  children: ReactNode;
};

/**
 * Split-screen auth shell: brand story + trust signals (left), form (right).
 * Stacks vertically on small screens; side-by-side from `lg`.
 */
export function AuthSplitLayout({ mode, children }: AuthSplitLayoutProps) {
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-slate-950 text-slate-100 lg:flex-row">
      <aside className="relative flex w-full flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 lg:w-[48%] lg:min-h-screen lg:max-w-xl lg:shrink-0 lg:px-10 xl:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(14,165,233,0.28),transparent_50%),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(30,58,138,0.45),transparent_55%)]" />
        </div>

        <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
          <Link
            to="/"
            className="flex w-fit items-center gap-2.5 rounded-lg text-white outline-none ring-offset-2 ring-offset-slate-950 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-900 shadow-lg shadow-sky-900/40">
              <Shield className="h-5 w-5 text-white" aria-hidden />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Verify<span className="text-sky-400">Stack</span>
            </span>
          </Link>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-300 sm:text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
            AI trust infrastructure
          </div>

          <div>
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[1.75rem] xl:text-3xl">
              {isLogin
                ? "Verify people and partners with confidence."
                : "Create your workspace for safer onboarding."}
            </h1>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              {isLogin
                ? "Identity checks, background verification, and Trust scores in one place—aligned with how teams hire, rent, and comply in India."
                : "Run BGV checks, track reports, and share proof of verification. Built for speed, security, and DPDP-aware workflows."}
            </p>
          </div>

          <ul className="flex flex-col gap-3 sm:gap-4">
            {[
              {
                icon: Zap,
                title: "Minutes, not weeks",
                desc: "Submit checks and watch status update in near real time.",
              },
              {
                icon: Lock,
                title: "Encrypted & consent-first",
                desc: "Strong transport security and clear consent paths for subjects.",
              },
              {
                icon: ShieldCheck,
                title: "Explainable Trust scores",
                desc: "Summaries your team can use in hiring, tenancy, and vendor decisions.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <item.icon className="h-5 w-5 text-sky-400" aria-hidden />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs leading-snug text-slate-400 sm:text-[13px]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="relative z-10 mt-6 hidden rounded-2xl border border-white/10 bg-sky-500/[0.12] p-4 text-sm leading-relaxed text-slate-200 backdrop-blur-sm sm:mt-8 sm:block lg:mt-10">
          <p className="text-pretty text-slate-100">
            &ldquo;We consolidated vendor and hire checks into one flow. Fewer back-and-forth emails, clearer audit trail.&rdquo;
          </p>
          <footer className="mt-3 text-xs font-medium text-slate-400">
            — Operations lead, B2B services firm
          </footer>
        </blockquote>
      </aside>

      <div className="relative flex min-h-0 w-full flex-1 flex-col bg-background lg:min-h-screen">
        <div className="absolute right-3 top-3 z-20 sm:right-5 sm:top-5 lg:right-8 lg:top-8">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
          {children}
        </div>
      </div>
    </div>
  );
}
