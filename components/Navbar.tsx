"use client";

import { useState } from "react";
import { Menu, X, ArrowRight, Sparkles } from "./icons";

const links = [
  ["Dashboard", "dashboard"],
  ["Product", "features"],
  ["How it works", "how-it-works"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_8px_35px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
          {/* Subtle top gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#625bf0]/60 to-transparent" />

          <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
            {/* ================= LOGO ================= */}
            <a
              href="#top"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#10152b] text-white shadow-lg shadow-slate-300/60 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[#625bf0]/20">
                  <span className="text-lg font-black">S</span>
                </div>

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#625bf0] ring-2 ring-white" />
              </div>

              <div className="leading-none">
                <div className="text-[16px] font-black tracking-tight text-[#10152b] sm:text-[17px]">
                  SAC{" "}
                  <span className="bg-gradient-to-r from-[#625bf0] to-[#7c3aed] bg-clip-text text-transparent">
                    InvoicePro
                  </span>
                </div>

                <div className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                  Smart billing workspace
                </div>
              </div>
            </a>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-slate-200/80 bg-slate-50/80 p-1 md:flex">
              {links.map(([title, href]) => (
                <a
                  key={href}
                  // href={`#${href}`}
                  href={href === "dashboard" ? "/dashboard" : `#${href}`}
                  className="group relative rounded-full px-4 py-2 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-white hover:text-[#10152b]"
                >
                  <span className="relative z-10">{title}</span>

                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[#625bf0] transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            {/* ================= DESKTOP ACTIONS ================= */}
            <div className="hidden items-center gap-2 md:flex">
              <a
                href="/login"
                className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#10152b]"
              >
                Sign in
              </a>

              <a
                href="#demo"
                className="group flex items-center gap-2 rounded-full bg-[#10152b] px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-slate-300/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#625bf0] hover:shadow-[#625bf0]/25"
              >
                <span>Start free</span>

                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#10152b] shadow-sm transition hover:bg-slate-50 md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}
          <div
            className={`grid transition-all duration-300 md:hidden ${open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white px-4 pb-5 pt-4 sm:px-6">
                {/* Mobile product card */}
                <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#625bf0]/10 bg-white p-3 shadow-sm">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#10152b] text-sm font-black text-white">
                    S
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#10152b]">
                        SAC InvoicePro
                      </span>

                      <Sparkles className="h-3.5 w-3.5 text-[#625bf0]" />
                    </div>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Simple billing. Better business.
                    </p>
                  </div>
                </div>

                {/* Mobile links */}
                <nav className="space-y-1">
                  {links.map(([title, href], index) => (
                    <a
                      key={href}
                      // href={`#${href}`}
                      href={href === "dashboard" ? "/dashboard" : `#${href}`}
                      onClick={closeMenu}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-[#625bf0] hover:shadow-sm"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-400 transition group-hover:bg-[#625bf0]/10 group-hover:text-[#625bf0]">
                          0{index + 1}
                        </span>

                        {title}
                      </span>

                      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#625bf0]" />
                    </a>
                  ))}
                </nav>

                {/* Mobile actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Sign in
                  </a>

                  <a
                    href="#demo"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#10152b] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300/50 transition hover:bg-[#625bf0]"
                  >
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}