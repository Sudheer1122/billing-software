"use client";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import InvoiceDemo from "../components/InvoiceDemo";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

import {
  ArrowRight,
  BarChart3,
  Bell,
  Clock3,
  FileText,
  Receipt,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from "../components/icons";

import { features } from "../lib/data";

const iconMap: any = {
  receipt: Receipt,
  chart: BarChart3,
  bolt: Zap,
  shield: ShieldCheck,
};

export default function Home() {
  return (
    <main id="top">
      <Navbar />

      {/* HERO */}
      <section className="grid-bg relative overflow-hidden pb-20 pt-36">
        <div className="absolute left-[10%] top-28 h-72 w-72 rounded-full bg-violet-300/25 blur-3xl" />

        <div className="absolute right-[8%] top-44 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm"
            >
              <Sparkles
                size={14}
                className="text-[#625bf0]"
              />

              Billing clarity for ambitious teams
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
              }}
              className="text-5xl font-black leading-[1.04] tracking-[-.055em] sm:text-7xl"
            >
              Invoice less.
              <br />

              <span className="gradient-text">
                Grow more.
              </span>
            </motion.h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              SAC InvoicePro turns everyday billing into a calm,
              connected workflow—so your team can create, track
              and get paid without the busywork.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10152b] px-7 py-3.5 font-bold text-white shadow-xl shadow-slate-300"
              >
                Build an invoice
                <ArrowRight size={18} />
              </a>

              <a
                href="#features"
                className="rounded-full border bg-white px-7 py-3.5 font-bold"
              >
                Explore product
              </a>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div className="hidden lg:block">
              <div className="float rounded-3xl border border-white bg-white/75 p-6 shadow-soft backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Cash collected
                    </p>

                    <p className="mt-1 text-3xl font-black">
                      $84,290
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    +18.4%
                  </span>
                </div>

                <div className="flex h-32 items-end gap-2">
                  {[
                    42,
                    54,
                    47,
                    68,
                    62,
                    82,
                    72,
                    95,
                    78,
                    100,
                    89,
                    108,
                  ].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-200 to-indigo-500"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-between text-[11px] text-slate-400">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>

            <InvoiceDemo />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-y bg-white py-20"
      >
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              One workspace
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Everything your billing team needs.
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              From the first estimate to the final payment,
              every step stays visible and easy to act on.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon =
                iconMap[feature.icon];

              return (
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-10 grid h-11 w-11 place-items-center rounded-2xl bg-[#f0efff] text-[#625bf0]">
                    <Icon size={21} />
                  </div>

                  <h3 className="font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#f7f8fc] py-24"
      >
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
                Simple by design
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                From work completed to money collected.
              </h2>

              <p className="mt-5 leading-7 text-slate-500">
                A focused workflow replaces scattered spreadsheets,
                manual reminders and status chasing.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  [
                    FileText,
                    "Create",
                    "Choose a client, add services and send a professional invoice.",
                  ],
                  [
                    Bell,
                    "Nudge",
                    "Automated reminders keep outstanding invoices visible without awkward follow-ups.",
                  ],
                  [
                    WalletCards,
                    "Collect",
                    "Track paid, pending and overdue balances from one live workspace.",
                  ],
                ].map(
                  ([Icon, title, description]) => {
                    const Component =
                      Icon as any;

                    return (
                      <div
                        className="flex gap-4"
                        key={title as string}
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#625bf0] shadow-sm">
                          <Component size={19} />
                        </div>

                        <div>
                          <h3 className="font-black">
                            {title as string}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {description as string}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="rounded-[30px] border bg-white p-6 shadow-soft">
              <div className="rounded-2xl bg-[#10152b] p-6 text-white">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Accounts receivable
                    </p>

                    <p className="mt-1 text-3xl font-black">
                      $42,680
                    </p>
                  </div>

                  <span className="text-emerald-300">
                    +12.8%
                  </span>
                </div>

                <div className="mt-8 grid gap-3">
                  {[
                    [
                      "Acme Creative",
                      "INV-2048",
                      "$8,400",
                      "Paid",
                    ],
                    [
                      "Northstar Labs",
                      "INV-2047",
                      "$4,920",
                      "Pending",
                    ],
                    [
                      "Orbit Studio",
                      "INV-2043",
                      "$2,180",
                      "Overdue",
                    ],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="grid grid-cols-[1fr_auto] items-center rounded-xl bg-white/10 p-3"
                    >
                      <div>
                        <p className="text-sm font-bold">
                          {row[0]}
                        </p>

                        <p className="text-xs text-slate-400">
                          {row[1]}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold">
                          {row[2]}
                        </p>

                        <p
                          className={`text-[11px] ${
                            row[3] === "Paid"
                              ? "text-emerald-300"
                              : row[3] ===
                                "Overdue"
                              ? "text-rose-300"
                              : "text-amber-300"
                          }`}
                        >
                          {row[3]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                Clock3,
                "Save 6+ hours",
                "on recurring billing and follow-ups every month.",
              ],
              [
                ShieldCheck,
                "Stay audit-ready",
                "with clear activity and role-aware access.",
              ],
              [
                Sparkles,
                "Look professional",
                "with consistent, branded customer experiences.",
              ],
            ].map(
              ([Icon, title, description]) => {
                const Component =
                  Icon as any;

                return (
                  <div
                    key={title as string}
                    className="rounded-3xl bg-[#f7f8fc] p-7"
                  >
                    <Component className="text-[#625bf0]" />

                    <h3 className="mt-8 font-black">
                      {title as string}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {description as string}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="bg-[#f7f8fc] py-24"
      >
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              Simple pricing
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Pick a plan. Keep moving.
            </h2>

            <p className="mt-4 text-slate-500">
              Start free, then scale when the business needs more.
            </p>
          </div>

          <Pricing />
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24"
      >
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Questions, answered.
            </h2>
          </div>

          <FAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[34px] bg-[#10152b] px-7 py-14 text-center text-white sm:px-16">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-bold text-indigo-200">
                Ready when you are
              </p>

              <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Make billing the easy part of your business.
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
                Build your first invoice in minutes and see how a calmer billing workflow feels.
              </p>

              <a
                href="#demo"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-black text-[#10152b]"
              >
                Start free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10">
        <div className="container flex flex-col justify-between gap-5 text-sm text-slate-500 sm:flex-row">
          <div>
            <span className="font-black text-slate-900">
              SAC InvoicePro
            </span>{" "}
            · Billing clarity for growing teams.
          </div>

          <div className="flex gap-5">
            <a href="#features">
              Product
            </a>

            <a href="#pricing">
              Pricing
            </a>

            <a href="#faq">
              FAQ
            </a>
          </div>

          <div>
            © 2026 SAC InvoicePro
          </div>
        </div>
      </footer>
    </main>
  );
}