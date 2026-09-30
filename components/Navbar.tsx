"use client";

import { useState } from "react";
import { Menu, X } from "./icons";

const links = [
  ["Product", "features"],
  ["How it works", "how-it-works"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="container flex h-[74px] items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#10152b] text-white">
            S
          </span>

          <span>
            SAC{" "}
            <span className="text-[#625bf0]">
              InvoicePro
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([title, href]) => (
            <a
              key={href}
              href={`#${href}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              {title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#pricing"
            className="px-3 py-2 text-sm font-semibold"
          >
            Sign in
          </a>

          <a
            href="#demo"
            className="rounded-full bg-[#10152b] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-300"
          >
            Start free
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-5 py-5 md:hidden">
          <div className="container flex flex-col gap-4">
            {links.map(([title, href]) => (
              <a
                onClick={() => setOpen(false)}
                key={href}
                href={`#${href}`}
                className="py-1 font-medium"
              >
                {title}
              </a>
            ))}

            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#10152b] px-5 py-3 text-center font-semibold text-white"
            >
              Start free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}