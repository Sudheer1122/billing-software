"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    Loader2,
    Sparkles,
} from "../../components/icons";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");

        if (!email || !password) {
            setMessage("Please enter your email and password.");
            setLoading(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 900));

        if (
            email.toLowerCase() === "demo@sacinvoicepro.com" &&
            password === "Demo@123"
        ) {
            if (remember) {
                localStorage.setItem(
                    "sac_invoicepro_demo_user",
                    JSON.stringify({
                        email,
                        name: "Demo User",
                    })
                );
            }

            window.location.href = "/dashboard";
            return;
        }

        setMessage(
            "Invalid credentials. Use demo@sacinvoicepro.com / Demo@123 for the demo."
        );

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#f7f8fc]">
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden overflow-hidden bg-[#10152b] lg:flex">
                    {/* Background glow */}
                    <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#625bf0]/30 blur-[120px]" />

                    <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/20 blur-[130px]" />

                    {/* Grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                            backgroundSize: "42px 42px",
                        }}
                    />

                    <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

                        {/* Brand */}
                        <Link
                            href="/"
                            className="inline-flex w-fit items-center gap-3"
                        >
                            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#10152b] shadow-xl">
                                <span className="text-lg font-black">S</span>
                            </div>

                            <div>
                                <div className="text-lg font-black tracking-tight text-white">
                                    SAC{" "}
                                    <span className="text-[#8b85ff]">
                                        InvoicePro
                                    </span>
                                </div>

                                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Smart billing workspace
                                </div>
                            </div>
                        </Link>

                        {/* Main content */}
                        <div className="max-w-xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2">
                                <Sparkles className="h-3.5 w-3.5 text-[#8b85ff]" />

                                <span className="text-xs font-semibold text-slate-300">
                                    Welcome back to your workspace
                                </span>
                            </div>

                            <h1 className="text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                                Billing that keeps your business{" "}
                                <span className="bg-gradient-to-r from-[#8b85ff] via-[#a78bfa] to-[#c4b5fd] bg-clip-text text-transparent">
                                    moving.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-lg text-base leading-7 text-slate-400">
                                Manage invoices, customers, payments and billing
                                insights from one simple workspace designed for
                                modern businesses.
                            </p>

                            {/* Benefits */}
                            <div className="mt-9 space-y-4">

                                {[
                                    "Create professional invoices in seconds",
                                    "Track payments and outstanding balances",
                                    "Download polished PDF invoices",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#625bf0]/15">
                                            <Check className="h-3.5 w-3.5 text-[#8b85ff]" />
                                        </span>

                                        <span className="text-sm font-medium text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Mini stats */}
                            <div className="mt-12 grid max-w-md grid-cols-3 gap-3">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                                    <p className="text-xl font-black text-white">
                                        24/7
                                    </p>
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Billing visibility
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                                    <p className="text-xl font-black text-white">
                                        100%
                                    </p>
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Digital invoices
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                                    <p className="text-xl font-black text-white">
                                        1
                                    </p>
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Connected workspace
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-xs text-slate-500">
                            © 2026 SAC InvoicePro. Simple. Clear. Connected.
                        </div>
                    </div>
                </section>


                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
                    <div className="w-full max-w-md">
                        {/* Mobile logo */}
                        <div className="mb-10 flex justify-center lg:hidden">
                            <Link
                                href="/"
                                className="flex items-center gap-3"
                            >
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#10152b] text-white shadow-lg">
                                    <span className="font-black">S</span>
                                </div>

                                <span className="text-lg font-black text-[#10152b]">
                                    SAC{" "}
                                    <span className="text-[#625bf0]">
                                        InvoicePro
                                    </span>
                                </span>
                            </Link>
                        </div>

                        {/* Login heading */}
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#625bf0]/10 bg-[#625bf0]/5 px-3 py-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#625bf0]" />

                                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#625bf0]">
                                    Secure workspace
                                </span>
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-[#10152b] sm:text-4xl">
                                Welcome back
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Sign in to continue managing your invoices,
                                customers and payments.
                            </p>
                        </div>

                        {/* Login card */}
                        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-bold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@company.com"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-bold text-slate-700"
                                        >
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="text-xs font-bold text-[#625bf0] transition hover:text-[#7c3aed]"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((value) => !value)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-slate-100 hover:text-[#10152b]"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember */}
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(event) =>
                                            setRemember(event.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-slate-300 accent-[#625bf0]"
                                    />

                                    <span className="text-sm font-medium text-slate-500">
                                        Keep me signed in
                                    </span>
                                </label>

                                {/* Error */}
                                {message && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold leading-5 text-red-600">
                                        {message}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10152b] text-sm font-bold text-white shadow-lg shadow-slate-300/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#625bf0] hover:shadow-[#625bf0]/20 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in to workspace
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-slate-100" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                    New to SAC InvoicePro?
                                </span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </div>

                            {/* Register */}
                            <Link
                                href="/register"
                                className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-[#10152b] transition hover:border-[#625bf0]/30 hover:bg-[#625bf0]/5 hover:text-[#625bf0]"
                            >
                                Create your account
                            </Link>
                        </div>

                        {/* Demo credentials */}
                        <div className="mt-5 rounded-2xl border border-[#625bf0]/10 bg-[#625bf0]/5 p-4">
                            <div className="flex items-start gap-3">
                                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#625bf0]/10">
                                    <Sparkles className="h-4 w-4 text-[#625bf0]" />
                                </div>

                                <div>
                                    <p className="text-xs font-black text-[#10152b]">
                                        Technical demo access
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Email:{" "}
                                        <span className="font-semibold text-slate-700">
                                            demo@sacinvoicepro.com
                                        </span>
                                        <br />
                                        Password:{" "}
                                        <span className="font-semibold text-slate-700">
                                            Demo@123
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="mt-7 text-center">
                            <Link
                                href="/"
                                className="text-xs font-semibold text-slate-400 transition hover:text-[#10152b]"
                            >
                                ← Back to SAC InvoicePro
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}