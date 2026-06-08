"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bot, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import AuthPanel from "@/components/AuthPanel";
import { useAuth } from "@/hooks/useAuth";

const featureItems = [
  {
    title: "Smart AI Agents",
    description: "Powerful agents for every task",
    icon: Zap,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade security",
    icon: ShieldCheck,
    accent: "from-teal-400 to-emerald-400",
  },
  {
    title: "Blazing Fast",
    description: "Instant responses, always",
    icon: Rocket,
    accent: "from-violet-500 to-fuchsia-400",
  },
];

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginShell />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const nextPath = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(nextPath.startsWith("/") ? nextPath : "/dashboard");
    }
  }, [isLoading, nextPath, router, user]);

  if (isLoading) {
    return <LoginLoadingState />;
  }

  return (
    <AuthExperience>
      <section className="relative z-10 grid w-full max-w-[1600px] grid-cols-1 overflow-hidden rounded-[24px] border border-white/70 bg-white/45 shadow-[0_40px_120px_rgba(37,99,235,0.12)] backdrop-blur-2xl sm:w-[95%] lg:h-[90vh] lg:max-h-[900px] lg:min-h-[760px] lg:grid-cols-[48fr_52fr] lg:overflow-visible lg:rounded-[32px]">
        <div className="relative flex min-h-[42rem] flex-col overflow-hidden px-5 py-6 sm:px-8 lg:min-h-0 lg:px-10 lg:py-8 xl:px-12">
          <FloatingCubes />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400 text-white shadow-[0_16px_35px_rgba(79,70,229,0.26)] xl:h-12 xl:w-12">
              <Sparkles className="h-5 w-5 xl:h-6 xl:w-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-950 xl:text-[32px]">
              LOKO <span className="text-sky-500">AI</span>
            </span>
          </div>

          <div className="relative z-10 mt-auto max-w-2xl pb-8 pt-14 lg:pb-10 xl:pb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-5 py-2.5 text-sm font-bold text-violet-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_38px_rgba(124,58,237,0.10)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Your AI Workspace
            </div>

            <h1 className="mt-8 max-w-xl text-6xl font-black leading-[0.94] tracking-tight text-slate-950 sm:text-7xl xl:text-[88px]">
              Welcome
              <span className="block bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Back!
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-xl leading-8 text-slate-600 xl:text-2xl xl:leading-10">
              Sign in to continue your journey and unlock the full power of LOKO AI.
            </p>

            <div className="mt-9 grid gap-4 xl:gap-5">
              {featureItems.map((item) => (
                <div key={item.title} className="group flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/75 shadow-[0_18px_45px_rgba(79,70,229,0.10)] backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-950 xl:text-xl">{item.title}</h2>
                    <p className="mt-1 text-base font-medium text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-[-5rem] h-[28rem] w-[34rem] opacity-90">
            <div className="absolute bottom-8 right-24 h-48 w-48 rotate-12 rounded-[2rem] border border-white/70 bg-gradient-to-br from-white/70 via-violet-200/35 to-blue-500/35 shadow-[inset_14px_18px_40px_rgba(255,255,255,0.9),0_30px_80px_rgba(79,70,229,0.22)] backdrop-blur-xl" />
            <div className="absolute bottom-[-2rem] right-80 h-32 w-32 -rotate-12 rounded-[1.6rem] border border-white/70 bg-gradient-to-br from-white/80 via-fuchsia-200/35 to-sky-400/35 shadow-[inset_10px_14px_32px_rgba(255,255,255,0.95),0_24px_70px_rgba(124,58,237,0.18)] backdrop-blur-xl" />
            <div className="absolute bottom-24 right-5 h-7 w-7 rounded-full bg-gradient-to-br from-white to-blue-300 shadow-[0_16px_35px_rgba(37,99,235,0.20)]" />
            <div className="absolute bottom-56 right-72 h-5 w-5 rounded-full bg-gradient-to-br from-white to-violet-300 shadow-[0_12px_30px_rgba(124,58,237,0.18)]" />
            <div className="absolute bottom-2 right-0 h-80 w-[34rem] rounded-[50%] border-t border-white/70 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16),transparent_62%)] blur-sm" />
          </div>
        </div>

        <div className="relative z-10 flex min-h-0 items-center justify-center px-5 py-6 sm:px-8 lg:px-8 lg:py-6 xl:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_55%)]" />
          <AuthPanel nextPath={nextPath} variant="page" />
        </div>
      </section>
    </AuthExperience>
  );
}

function AuthExperience({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-dvh overflow-x-hidden overflow-y-auto bg-[#f8fbff] p-0 text-slate-950 sm:p-4 lg:overflow-hidden lg:p-0">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_36%,#eaf4ff_68%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-[12%] top-[8%] h-72 w-72 rounded-full bg-violet-200/45 blur-3xl" />
      <div className="absolute bottom-[8%] right-[14%] h-96 w-96 rounded-full bg-sky-200/55 blur-3xl" />
      <div className="absolute left-[42%] top-[18%] h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="relative mx-auto flex min-h-dvh w-full items-center justify-center">
        {children}
      </div>
    </main>
  );
}

function FloatingCubes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[54%] top-[12%] h-4 w-4 rotate-45 rounded-sm bg-white shadow-[0_0_30px_rgba(255,255,255,0.9)]" />
      <div className="absolute left-[67%] top-[29%] h-8 w-8 rotate-45 rounded-sm bg-white/95 shadow-[0_0_34px_rgba(255,255,255,0.95)]" />
      <div className="absolute bottom-[10%] left-[6%] h-9 w-9 rounded-full bg-gradient-to-br from-white to-blue-100 shadow-[0_18px_38px_rgba(37,99,235,0.14)]" />
      <div className="absolute bottom-[14%] left-[40%] h-5 w-5 rounded-full bg-gradient-to-br from-white to-violet-100 shadow-[0_14px_34px_rgba(124,58,237,0.12)]" />
      <div className="absolute left-[70%] top-[46%] h-48 w-96 rounded-[50%] border border-white/45 opacity-70" />
      <div className="absolute left-[64%] top-[52%] h-44 w-96 rounded-[50%] border border-white/35 opacity-70" />
      <div className="absolute left-[60%] top-[58%] h-40 w-96 rounded-[50%] border border-white/30 opacity-70" />
    </div>
  );
}

function LoginShell() {
  return (
    <AuthExperience>
      <div className="relative z-10 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-violet-500">Secure Workspace Access</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          Preparing secure login...
        </h1>
      </div>
    </AuthExperience>
  );
}

function LoginLoadingState() {
  return (
    <AuthExperience>
      <div className="relative z-10 max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/75 shadow-[0_18px_50px_rgba(79,70,229,0.18)] backdrop-blur-xl">
          <Bot className="h-6 w-6 animate-pulse text-violet-600" />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-violet-500">Secure Workspace Access</p>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          Checking your session...
        </h1>
        <p className="text-sm text-slate-600">
          We are verifying your account before continuing.
        </p>
      </div>
    </AuthExperience>
  );
}
