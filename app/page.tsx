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
  Check,
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

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <main id="top" className="overflow-hidden bg-white text-[#10152b]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#fafbff] pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          {/* Left glow */}
          <div className="absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-[110px]" />

          {/* Right glow */}
          <div className="absolute right-[-8%] top-[12%] h-[460px] w-[460px] rounded-full bg-indigo-300/20 blur-[120px]" />

          {/* Center glow */}
          <div className="absolute left-1/2 top-[-120px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-100/30 blur-[100px]" />

          {/* Bottom glow */}
          <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/20 blur-[120px]" />
        </div>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-50
            [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
            [background-size:60px_60px]
            [mask-image:linear-gradient(to_bottom,black,transparent_85%)]
          "
        />

        <div className="container relative">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-6xl text-center"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mx-auto
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#625bf0]/15
                bg-white
                px-4
                py-2
                text-xs
                font-bold
                text-slate-600
                shadow-[0_8px_30px_rgba(98,91,240,0.08)]
              "
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#625bf0]/10">
                <Sparkles size={12} className="text-[#625bf0]" />
              </span>

              <span>Modern invoicing for growing businesses</span>

              <span className="hidden text-[#625bf0] sm:inline">→</span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.65,
              }}
              className="
                text-[48px]
                font-black
                leading-[0.98]
                tracking-[-0.065em]
                sm:text-7xl
                lg:text-[88px]
              "
            >
              <span className="block">Invoice less.</span>

              <span className="gradient-text">Grow more.</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.16,
                duration: 0.6,
              }}
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                sm:leading-8
              "
            >
              SAC InvoicePro brings invoicing, payments, customers and billing
              insights into one beautifully simple workspace.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.24,
                duration: 0.6,
              }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              {/* Primary CTA */}
              <a
                href="#demo"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#10152b]
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_16px_35px_rgba(16,21,43,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#625bf0]
                  hover:shadow-[0_18px_40px_rgba(98,91,240,0.25)]
                "
              >
                Create your first invoice
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={17} />
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#features"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                Explore platform
                <ArrowRight size={16} className="text-slate-400" />
              </a>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2
                text-xs
                font-medium
                text-slate-400
              "
            >
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                No credit card required
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                Professional PDF invoices
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                Built for modern teams
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.35,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto mt-16 max-w-6xl"
          >
            <div
              className="
                absolute
                -inset-5
                rounded-[40px]
                bg-gradient-to-r
                from-violet-300/20
                via-indigo-300/20
                to-cyan-200/20
                blur-2xl
              "
            />
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200/80
                bg-white
                p-2
                shadow-[0_35px_100px_rgba(15,23,42,0.13)]
                sm:p-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  items-center
                  justify-between
                  rounded-t-[22px]
                  border-b
                  border-slate-100
                  bg-slate-50/80
                  px-4
                  sm:px-5
                "
              >
                {/* Browser dots */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                {/* URL */}
                <div
                  className="
                    hidden
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-1.5
                    sm:flex
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[10px] font-semibold text-slate-500">
                    app.sacinvoicepro.com/dashboard
                  </span>
                </div>

                {/* User / Live */}
                <div className="flex items-center gap-2">
                  <span className="hidden text-[10px] font-semibold text-emerald-600 sm:block">
                    Live
                  </span>

                  <div
                    className="
                      grid
                      h-7
                      w-7
                      place-items-center
                      rounded-full
                      bg-[#625bf0]/10
                      text-[9px]
                      font-black
                      text-[#625bf0]
                    "
                  >
                    SK
                  </div>
                </div>
              </div>

              <div
                className="
                  grid
                  gap-4
                  bg-[#f8f9fc]
                  p-4
                  sm:p-6
                  lg:grid-cols-[210px_1fr]
                "
              >
                <div
                  className="
                    hidden
                    rounded-2xl
                    bg-[#10152b]
                    p-4
                    text-white
                    lg:block
                  "
                >
                  {/* Logo */}
                  <div className="mb-8 flex items-center gap-2">
                    <div
                      className="
                        grid
                        h-8
                        w-8
                        place-items-center
                        rounded-lg
                        bg-[#625bf0]
                        text-sm
                        font-black
                      "
                    >
                      S
                    </div>

                    <span className="text-sm font-bold">InvoicePro</span>
                  </div>

                  {/* Navigation */}
                  <div className="space-y-1">
                    {[
                      "Overview",
                      "Invoices",
                      "Customers",
                      "Payments",
                      "Reports",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`
                          rounded-xl
                          px-3
                          py-2.5
                          text-xs
                          font-semibold
                          transition
                          ${index === 0
                            ? "bg-white/10 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Revenue card */}
                  <div className="mt-20 rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] text-slate-400">
                      Monthly revenue
                    </p>

                    <p className="mt-1 text-lg font-black">$84.2K</p>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: "78%",
                        }}
                        transition={{
                          delay: 1,
                          duration: 0.8,
                        }}
                        className="h-full rounded-full bg-[#625bf0]"
                      />
                    </div>

                    <p className="mt-2 text-[9px] text-slate-500">
                      78% of monthly target
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  {/* Dashboard header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Tuesday, September 30
                      </p>

                      <h3 className="mt-1 text-lg font-black sm:text-xl">
                        Good morning, team
                      </h3>
                    </div>

                    <a
                      href="#demo"
                      className="
                        hidden
                        rounded-xl
                        bg-[#10152b]
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-white
                        shadow-sm
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-[#625bf0]
                        sm:block
                      "
                    >
                      + New invoice
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Revenue", "$84,290", "+18.4%"],
                      ["Invoices", "248", "+12.8%"],
                      ["Pending", "$12,480", "-4.2%"],
                      ["Customers", "126", "+9.6%"],
                    ].map(([label, value, change]) => (
                      <motion.div
                        key={label}
                        whileHover={{
                          y: -3,
                        }}
                        className="
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          p-4
                          transition-shadow
                          hover:shadow-md
                        "
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {label}
                        </p>

                        <p className="mt-2 text-lg font-black tracking-tight sm:text-xl">
                          {value}
                        </p>

                        <p
                          className={`mt-1 text-[10px] font-bold ${change.startsWith("-")
                            ? "text-rose-500"
                            : "text-emerald-600"
                            }`}
                        >
                          {change}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_.8fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-500">
                            Revenue overview
                          </p>

                          <p className="mt-1 text-2xl font-black">$84,290</p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                          +18.4%
                        </span>
                      </div>

                      {/* Bars */}
                      <div className="mt-7 flex h-32 items-end gap-2">
                        {[38, 52, 44, 61, 55, 72, 64, 80, 67, 94, 78, 100].map(
                          (height, index) => (
                            <motion.div
                              key={index}
                              initial={{
                                height: 0,
                              }}
                              whileInView={{
                                height: `${height}%`,
                              }}
                              viewport={{
                                once: true,
                              }}
                              transition={{
                                delay: 0.5 + index * 0.04,
                                duration: 0.5,
                              }}
                              className="
                                flex-1
                                rounded-t-md
                                bg-gradient-to-t
                                from-[#625bf0]/30
                                to-[#625bf0]
                              "
                            />
                          ),
                        )}
                      </div>

                      {/* Months */}
                      <div className="mt-3 flex justify-between text-[9px] text-slate-400">
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>Jun</span>
                        <span>Sep</span>
                        <span>Dec</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-500">
                          Recent invoices
                        </p>

                        <a
                          href="#demo"
                          className="text-[10px] font-bold text-[#625bf0] transition hover:text-[#4f46d8]"
                        >
                          View all
                        </a>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          ["Northstar Studio", "$4,920", "Paid"],
                          ["Acme Creative", "$8,400", "Pending"],
                          ["Orbit Studio", "$2,180", "Overdue"],
                        ].map(([name, amount, status], index) => (
                          <motion.div
                            key={name}
                            initial={{
                              opacity: 0,
                              x: 10,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                            }}
                            className="
                              flex
                              items-center
                              justify-between
                              border-b
                              border-slate-100
                              pb-3
                              last:border-0
                              last:pb-0
                            "
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <div
                                className="
                                  grid
                                  h-8
                                  w-8
                                  shrink-0
                                  place-items-center
                                  rounded-lg
                                  bg-[#625bf0]/10
                                  text-[#625bf0]
                                "
                              >
                                <Receipt size={14} />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-xs font-bold">
                                  {name}
                                </p>

                                <p className="text-[10px] text-slate-400">
                                  INV-2048
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-xs font-bold">{amount}</p>

                              <p
                                className={`text-[9px] font-bold ${status === "Paid"
                                  ? "text-emerald-600"
                                  : status === "Overdue"
                                    ? "text-rose-500"
                                    : "text-amber-500"
                                  }`}
                              >
                                {status}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:hidden">
                    <a
                      href="#demo"
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#10152b]
                        px-4
                        py-3
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      + Create new invoice
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                y: 5,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
              className="
                absolute
                -right-2
                top-24
                hidden
                w-56
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-[0_20px_50px_rgba(15,23,42,0.15)]
                sm:block
                lg:-right-8
              "
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Check size={17} />
                </div>

                <div>
                  <p className="text-xs font-black">Payment received</p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Northstar Studio · $4,920
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 1.15,
                duration: 0.6,
              }}
              className="
                absolute
                -left-3
                bottom-10
                hidden
                w-48
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                xl:block
              "
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#625bf0]/10 text-[#625bf0]">
                  <Receipt size={16} />
                </div>

                <div>
                  <p className="text-xs font-black">Invoice created</p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    INV-2048 · $8,400
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mx-auto
              mt-10
              grid
              max-w-4xl
              grid-cols-1
              divide-y
              divide-slate-200
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              sm:grid-cols-3
              sm:divide-x
              sm:divide-y-0
            "
          >
            {/* Value 1 */}
            <div className="px-5 py-5 text-center">
              <p className="text-xl font-black text-[#10152b]">100%</p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                Digital invoicing
              </p>
            </div>

            {/* Value 2 */}
            <div className="px-5 py-5 text-center">
              <p className="text-xl font-black text-[#10152b]">24/7</p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                Billing visibility
              </p>
            </div>

            {/* Value 3 */}
            <div className="px-5 py-5 text-center">
              <p className="text-xl font-black text-[#10152b]">1 workspace</p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                For your entire billing flow
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="demo" className="relative bg-white py-24 sm:py-28">
        <div className="container">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              Try it yourself
            </p>

            <h2 className="mt-3 whitespace-nowrap text-4xl font-black tracking-tight sm:text-5xl">
              Your invoice workflow, without the clutter.
            </h2>

            <p className="mt-5 whitespace-nowrap max-w-xl leading-7 text-slate-500">
              Create a professional invoice, calculate totals and download a
              polished PDF — all from one focused workspace.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <InvoiceDemo />
          </motion.div>
        </div>
      </section>

      <section
        id="features"
        className="relative overflow-hidden border-y border-slate-100 bg-[#fafbff] py-24 sm:py-28"
      >
        <div className="absolute right-[-120px] top-[-100px] h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />

        <div className="container relative">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            className="max-w-2xl"
          >
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              One workspace
            </p>

            <h2 className="mt-3 whitespace-nowrap text-4xl font-black tracking-tight sm:text-5xl">
              Everything your billing team needs.
            </h2>

            <p className="mt-5 whitespace-nowrap leading-7 text-slate-500">
              From creating the invoice to tracking payment status, everything
              stays organized in one simple workflow.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#625bf0]/5 blur-2xl transition group-hover:bg-[#625bf0]/10" />

                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#625bf0]/10 text-[#625bf0] transition duration-300 group-hover:scale-110 group-hover:bg-[#625bf0] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-10 font-black">{feature.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {feature.text}
                    </p>

                    <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#625bf0] opacity-0 transition group-hover:opacity-100">
                      Learn more
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-24 sm:py-28">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
              }}
            >
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
                Simple by design
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                From work completed to money collected.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-slate-500">
                Replace spreadsheets, manual reminders and scattered payment
                updates with one clear billing workflow.
              </p>

              <div className="mt-9 space-y-6">
                {[
                  [
                    FileText,
                    "Create",
                    "Choose a customer, add services and generate a professional invoice.",
                  ],
                  [
                    Bell,
                    "Nudge",
                    "Keep outstanding invoices visible and follow up without the busywork.",
                  ],
                  [
                    WalletCards,
                    "Collect",
                    "Track paid, pending and overdue balances from one live workspace.",
                  ],
                ].map(([Icon, title, description], index) => {
                  const Component = Icon as any;

                  return (
                    <div className="group flex gap-4" key={title as string}>
                      <div className="relative">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-[#625bf0] shadow-sm transition group-hover:border-[#625bf0]/20 group-hover:bg-[#625bf0] group-hover:text-white">
                          <Component size={19} />
                        </div>

                        {index < 2 && (
                          <div className="absolute left-1/2 top-12 h-8 w-px bg-slate-200" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-black">{title as string}</h3>

                        <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                          {description as string}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Dashboard card */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-violet-200/40 to-indigo-200/20 blur-2xl" />

              <div className="relative rounded-[30px] border border-slate-200 bg-[#10152b] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Accounts receivable
                    </p>

                    <p className="mt-1 text-3xl font-black text-white">
                      $42,680
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    +12.8%
                  </span>
                </div>

                {/* Mini graph */}
                <div className="mt-7 flex h-24 items-end gap-2">
                  {[35, 45, 38, 58, 48, 70, 61, 78, 65, 86, 74, 95].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-[#625bf0]/20 to-[#625bf0]"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    ),
                  )}
                </div>

                {/* Invoice rows */}
                <div className="mt-7 space-y-3">
                  {[
                    ["Acme Creative", "INV-2048", "$8,400", "Paid"],
                    ["Northstar Labs", "INV-2047", "$4,920", "Pending"],
                    ["Orbit Studio", "INV-2043", "$2,180", "Overdue"],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.06] p-3.5"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">{row[0]}</p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {row[1]}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{row[2]}</p>

                        <p
                          className={`mt-0.5 text-[10px] font-bold ${row[3] === "Paid"
                            ? "text-emerald-300"
                            : row[3] === "Overdue"
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

                {/* Floating badge */}
                <div className="absolute -right-3 -top-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:-right-5">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Check size={15} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-slate-400">
                        Payments
                      </p>

                      <p className="text-xs font-black">Up to date</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-[#f8f9fc] py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                Clock3,
                "Save valuable time",
                "Reduce repetitive billing work and spend more time growing the business.",
              ],
              [
                ShieldCheck,
                "Stay organized",
                "Keep invoice records, customer details and payment statuses easy to access.",
              ],
              [
                Sparkles,
                "Look professional",
                "Create polished invoices and deliver a consistent customer experience.",
              ],
            ].map(([Icon, title, description], index) => {
              const Component = Icon as any;

              return (
                <motion.div
                  key={title as string}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="group rounded-[26px] border border-slate-200/80 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.07)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#625bf0]/10 text-[#625bf0] transition group-hover:bg-[#625bf0] group-hover:text-white">
                    <Component size={20} />
                  </div>

                  <h3 className="mt-7 font-black">{title as string}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description as string}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative overflow-hidden bg-[#fafbff] py-24 sm:py-28"
      >
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-200/20 blur-3xl" />

        <div className="container relative">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#625bf0]/10 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#625bf0]">
              <Sparkles size={12} />
              Simple pricing
            </div>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Pick a plan.
              <br />
              Keep moving.
            </h2>

            <p className="mt-5 text-slate-500">
              Start small and scale your billing workspace as your business
              grows.
            </p>
          </motion.div>

          <Pricing />
        </div>
      </section>

      <section id="faq" className="bg-white py-24 sm:py-28">
        <div className="container">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#625bf0]">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          <FAQ />
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[34px] bg-[#10152b] px-6 py-16 text-center text-white sm:px-16 sm:py-20">
            {/* Decorative circles */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#625bf0]/30 blur-3xl" />

            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                <Sparkles size={12} />
                Ready when you are
              </div>

              <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Make billing the easy part of your business.
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
                Create your first invoice, download a professional PDF and
                experience a simpler billing workflow.
              </p>

              <a
                href="#demo"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#10152b] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#f4f3ff]"
              >
                Start building
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={17} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-slate-200 bg-[#10152b] text-white">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#625bf0]/20 blur-[100px]" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="container relative">
          <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <a
                href="#top"
                className="inline-flex items-center gap-2"
              >
                <span
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#625bf0]
                    to-[#7c3aed]
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    shadow-indigo-900/30
                  "
                >
                  S
                </span>

                <span className="text-lg font-black tracking-tight">
                  SAC{" "}
                  <span className="text-[#8b85ff]">
                    InvoicePro
                  </span>
                </span>
              </a>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                A simple, modern billing workspace for creating
                invoices, tracking payments and keeping your business
                moving.
              </p>

              {/* Status */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[11px] font-semibold text-slate-300">
                  Billing workspace online
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white">
                Product
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#features"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#demo"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Invoice Builder
                </a>

                <a
                  href="#how-it-works"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  How it works
                </a>

                <a
                  href="#pricing"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white">
                Resources
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#faq"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  FAQ
                </a>

                <a
                  href="#demo"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Live Demo
                </a>

                <a
                  href="#features"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Billing Features
                </a>

                <a
                  href="#pricing"
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  Plans
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white">
                Get started
              </h3>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                Create your first invoice and experience a simpler
                billing workflow.
              </p>

              <a
                href="#demo"
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-black
                  text-[#10152b]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#8b85ff]
                  hover:text-white
                "
              >
                Create an invoice

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="border-t border-white/10" />
          <div className="flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <div className="text-slate-500">
              © 2026{" "}
              <span className="font-semibold text-slate-300">
                SAC InvoicePro
              </span>
              . All rights reserved.
            </div>

            {/* Center */}
            <div className="flex items-center gap-2 text-slate-500">
              <span>Built for modern businesses</span>

              <span className="h-1 w-1 rounded-full bg-slate-600" />

              <span>Simple. Clear. Connected.</span>
            </div>

            {/* Back to top */}
            <a
              href="#top"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-slate-400
                transition
                hover:text-white
              "
            >
              Back to top
              <span
                className="
                  grid
                  h-7
                  w-7
                  place-items-center
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  transition
                  group-hover:-translate-y-0.5
                  group-hover:bg-white/10
                "
              >
                ↑
              </span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
