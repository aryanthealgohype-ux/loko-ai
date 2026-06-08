"use client";

import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, Phone, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type AuthMode = "email" | "phone";

type AuthPanelProps = {
  nextPath?: string;
  onSuccess?: () => void;
  variant?: "modal" | "page";
};

export default function AuthPanel({ nextPath = "/dashboard", onSuccess, variant = "modal" }: AuthPanelProps) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { isConfigured, refreshUser } = useAuth();

  const [mode, setMode] = useState<AuthMode>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const siteUrl = typeof window === "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : window.location.origin;
  const safeNextPath = nextPath.startsWith("/") ? nextPath : "/dashboard";
  const isPage = variant === "page";

  const finishLogin = async () => {
    await refreshUser();
    onSuccess?.();
    router.push(safeNextPath);
    router.refresh();
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
      },
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (!signInError) {
      setMessage("Welcome back. Opening your dashboard...");
      await finishLogin();
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setMessage("Account created. Check your email if confirmation is enabled.");
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Password reset link sent to your email.");
    }

    setIsLoading(false);
  };

  const handleSendOtp = async () => {
    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: otpError } = await supabase.auth.signInWithOtp({ phone });
    if (otpError) {
      setError(otpError.message);
    } else {
      setOtpSent(true);
      setMessage("OTP sent. Enter the code to continue.");
    }

    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!phone || !otp) {
      setError("Phone number and OTP are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    if (verifyError) {
      setError(verifyError.message);
      setIsLoading(false);
    } else {
      await finishLogin();
    }
  };

  return (
    <div className={cn("relative w-full", isPage ? "max-w-[720px]" : "max-w-md")}>
      <div
        className={cn(
          "relative rounded-[2rem] p-[1px]",
          isPage
            ? "bg-gradient-to-br from-white/95 via-violet-200/55 to-blue-200/65 shadow-[0_34px_100px_rgba(37,99,235,0.20)]"
            : "bg-gradient-to-b from-sky-200/80 via-white to-cyan-200/80 shadow-[0_22px_70px_rgba(14,165,233,0.18)]"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute rounded-[2.4rem] blur-3xl",
            isPage
              ? "-inset-16 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.22),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_55%)]"
              : "-inset-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.16),transparent_50%)]"
          )}
        />

        <section
          className={cn(
            "relative overflow-hidden border border-white/70 bg-white/82 backdrop-blur-2xl",
            isPage
              ? "rounded-[24px] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_24px_70px_rgba(15,23,42,0.12)] sm:rounded-[32px] sm:p-7 lg:p-8 xl:p-9 2xl:p-10"
              : "rounded-[1.7rem] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
          )}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-28 rounded-b-[2rem] bg-gradient-to-b from-blue-100/70 via-violet-50/50 to-transparent blur-2xl" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-100 bg-white/80 text-violet-600 shadow-[0_14px_34px_rgba(124,58,237,0.12)]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="mt-5">
              <h2 className={cn("font-black tracking-tight text-slate-950", isPage ? "text-4xl sm:text-[40px] xl:text-[44px]" : "text-2xl")}>
                Welcome Back!
              </h2>
              <p className="mt-3 text-base font-medium leading-7 text-slate-600 xl:text-lg">
                Choose your preferred provider to get started.
              </p>
            </div>

            {!isConfigured && (
              <div className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-400/10 p-4 text-sm font-medium text-amber-700">
                Supabase keys are not configured yet. Add them to `.env.local` to enable login.
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                disabled={isLoading || !isConfigured}
                className="group flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white/78 px-4 text-sm font-bold text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(79,70,229,0.12)] disabled:pointer-events-none disabled:opacity-55"
              >
                <GoogleLogo className="h-5 w-5" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("github")}
                disabled={isLoading || !isConfigured}
                className="group flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white/78 px-4 text-sm font-bold text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-[0_16px_34px_rgba(79,70,229,0.12)] disabled:pointer-events-none disabled:opacity-55"
              >
                <GitHubLogo className="h-5 w-5" />
                Continue with GitHub
              </button>
            </div>

            <div className="my-5 flex items-center gap-5 xl:my-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
              <span className="text-sm font-bold text-slate-500">or</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
            </div>

            <div className="grid grid-cols-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setMode("email")}
                className={cn(
                  "relative h-12 text-sm font-bold transition",
                  mode === "email" ? "text-violet-600" : "text-slate-500 hover:text-slate-800"
                )}
              >
                Email
                {mode === "email" && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />}
              </button>
              <button
                type="button"
                onClick={() => setMode("phone")}
                className={cn(
                  "relative h-12 text-sm font-bold transition",
                  mode === "phone" ? "text-violet-600" : "text-slate-500 hover:text-slate-800"
                )}
              >
                Phone OTP
                {mode === "phone" && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />}
              </button>
            </div>

            {mode === "email" ? (
              <div className="mt-5 space-y-3 xl:space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-800">Email Address</span>
                  <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(15,23,42,0.04)] transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="yourname@example.com"
                      type="email"
                      className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-800">Password</span>
                  <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(15,23,42,0.04)] focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
                    <LockKeyhole className="h-5 w-5 text-slate-400" />
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isLoading || !isConfigured}
                    className="text-sm font-bold text-violet-600 transition hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleEmailAuth}
                  disabled={isLoading || !isConfigured}
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600 px-5 text-base font-black text-white shadow-[0_18px_38px_rgba(79,70,229,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(37,99,235,0.32)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-55"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue with Email"}
                  {!isLoading && <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-3 xl:space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-800">Phone Number</span>
                  <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(15,23,42,0.04)] focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+1 555 000 0000"
                      type="tel"
                      className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>
                {otpSent && (
                  <label className="block">
                    <span className="text-sm font-bold text-slate-800">One-time Password</span>
                    <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(15,23,42,0.04)] focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
                      <LockKeyhole className="h-5 w-5 text-slate-400" />
                      <input
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        placeholder="6-digit OTP"
                        inputMode="numeric"
                        className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
                      />
                    </span>
                  </label>
                )}
                <button
                  type="button"
                  onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                  disabled={isLoading || !isConfigured}
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600 px-5 text-base font-black text-white shadow-[0_18px_38px_rgba(79,70,229,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(37,99,235,0.32)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-55"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : otpSent ? "Verify OTP" : "Send OTP"}
                  {!isLoading && <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
              </div>
            )}

            {message && <div className="mt-5 rounded-2xl bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-700">{message}</div>}
            {error && <div className="mt-5 rounded-2xl bg-red-500/10 p-4 text-sm font-semibold text-red-600">{error}</div>}

            <p className="mt-6 text-center text-sm font-semibold text-slate-500">
              Don&apos;t have an account?{" "}
              <button type="button" onClick={handleEmailAuth} className="font-black text-violet-600 transition hover:text-blue-600">
                Register here
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.96c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
