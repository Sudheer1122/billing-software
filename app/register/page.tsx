"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    Loader2,
    ShieldCheck,
    Sparkles,
    Eye,
    EyeOff,
} from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        if (!form.name || !form.email || !form.company || !form.password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));

            localStorage.setItem(
                "sac_invoicepro_user",
                JSON.stringify({
                    name: form.name,
                    email: form.email,
                    company: form.company,
                }),
            );

            window.location.href = "/dashboard";
        } catch {
            setError("Unable to create your account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-[#10152b]">
            <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
                {/* LEFT BRAND PANEL */}
                <section className="relative hidden overflow-hidden bg-[#10152b] lg:flex">
                    <div className="absolute inset-0">
                        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#625bf0]/25 blur-[100px]" />
                        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#7c3aed]/20 blur-[110px]" />

                        <div
                            className="absolute inset-0 opacity-[0.07]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                                backgroundSize: "42px 42px",
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
                        {/* LOGO */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#625bf0] to-[#7c3aed] text-lg font-black text-white shadow-lg shadow-indigo-950/40">
                                S
                            </div>

                            <div>
                                <div className="text-lg font-black tracking-tight text-white">
                                    SAC{" "}
                                    <span className="text-[#8b85ff]">
                                        InvoicePro
                                    </span>
                                </div>

                                <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Smart billing workspace
                                </div>
                            </div>
                        </Link>

                        {/* MAIN CONTENT */}
                        <div className="max-w-xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
                                <Sparkles className="h-3.5 w-3.5 text-[#8b85ff]" />

                                <span className="text-[11px] font-semibold text-slate-300">
                                    Start your free workspace
                                </span>
                            </div>

                            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white xl:text-5xl">
                                Build a better
                                <span className="block bg-gradient-to-r from-[#8b85ff] to-[#c4b5fd] bg-clip-text text-transparent">
                                    billing workflow.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Create professional invoices, manage customers,
                                track payments and keep your business moving from
                                one simple workspace.
                            </p>

                            {/* BENEFITS */}
                            <div className="mt-8 space-y-3">
                                {[
                                    "Create professional PDF invoices",
                                    "Track invoices and payment status",
                                    "Keep customers and billing in one place",
                                    "Simple workspace built for growing businesses",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-slate-300"
                                    >
                                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#625bf0]/15 text-[#8b85ff]">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span>Your workspace is designed with security in mind.</span>
                        </div>
                    </div>
                </section>

                {/* RIGHT FORM */}
                <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
                    <div className="w-full max-w-lg">
                        {/* MOBILE LOGO */}
                        <div className="mb-10 lg:hidden">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#10152b] text-lg font-black text-white">
                                    S
                                </div>

                                <div className="text-base font-black text-[#10152b]">
                                    SAC{" "}
                                    <span className="text-[#625bf0]">
                                        InvoicePro
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* HEADER */}
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#625bf0]/10 bg-[#625bf0]/5 px-3 py-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-[#625bf0]" />

                                <span className="text-[11px] font-bold text-[#625bf0]">
                                    14-day free workspace
                                </span>
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-[#10152b] sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Set up your SAC InvoicePro workspace in a few
                                seconds.
                            </p>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            {/* NAME */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        updateField("name", e.target.value)
                                    }
                                    placeholder="Sudheer Kumar"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#10152b] outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:ring-4 focus:ring-[#625bf0]/10"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                    Work email
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        updateField("email", e.target.value)
                                    }
                                    placeholder="you@company.com"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#10152b] outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:ring-4 focus:ring-[#625bf0]/10"
                                />
                            </div>

                            {/* COMPANY */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                    Company name
                                </label>

                                <input
                                    type="text"
                                    value={form.company}
                                    onChange={(e) =>
                                        updateField("company", e.target.value)
                                    }
                                    placeholder="Your company"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#10152b] outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:ring-4 focus:ring-[#625bf0]/10"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) =>
                                            updateField("password", e.target.value)
                                        }
                                        placeholder="Create a password"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-[#10152b] outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:ring-4 focus:ring-[#625bf0]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((value) => !value)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label className="mb-2 block text-xs font-bold text-slate-700">
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={form.confirmPassword}
                                        onChange={(e) =>
                                            updateField(
                                                "confirmPassword",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Confirm your password"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-[#10152b] outline-none transition placeholder:text-slate-400 focus:border-[#625bf0] focus:ring-4 focus:ring-[#625bf0]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (value) => !value,
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* ERROR */}
                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* TERMS */}
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border border-slate-300 bg-white">
                                    <Check className="h-3 w-3 text-[#625bf0]" />
                                </div>

                                <p className="text-xs leading-5 text-slate-500">
                                    By creating an account, you agree to our{" "}
                                    <span className="font-semibold text-slate-700">
                                        Terms of Service
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-semibold text-slate-700">
                                        Privacy Policy
                                    </span>
                                    .
                                </p>
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10152b] text-sm font-bold text-white shadow-lg shadow-slate-300/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#625bf0] hover:shadow-[#625bf0]/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating workspace...
                                    </>
                                ) : (
                                    <>
                                        Create free account
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* LOGIN */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-bold text-[#625bf0] transition hover:text-[#7c3aed]"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        {/* TRUST */}
                        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Secure workspace setup
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            No credit card required
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}