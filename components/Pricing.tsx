"use client";

import { useState } from "react";
import { Check } from "./icons";

const plans = [
  {
    name: "Starter",
    m: 19,
    y: 15,
    desc: "For freelancers and side projects",
    items: [
      "Unlimited invoices",
      "Payment reminders",
      "Basic reports",
      "1 team member",
    ],
  },
  {
    name: "Growth",
    m: 49,
    y: 39,
    desc: "For growing service businesses",
    popular: true,
    items: [
      "Everything in Starter",
      "Recurring invoices",
      "Advanced analytics",
      "5 team members",
      "Custom invoice branding",
    ],
  },
  {
    name: "Scale",
    m: 99,
    y: 79,
    desc: "For teams with complex billing",
    items: [
      "Everything in Growth",
      "Approval workflows",
      "Audit activity",
      "Unlimited team members",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-full border bg-white p-1 shadow-sm">
        <button
          onClick={() => setYearly(false)}
          className={`rounded-full px-5 py-2 text-sm font-bold ${!yearly
            ? "bg-[#10152b] text-white"
            : ""
            }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setYearly(true)}
          className={`rounded-full px-5 py-2 text-sm font-bold ${yearly
            ? "bg-[#10152b] text-white"
            : ""
            }`}
        >
          Yearly{" "}
          <span className="ml-1 text-emerald-500">
            Save 20%
          </span>
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-7 ${plan.popular
              ? "border-[#6d64f4] bg-[#10152b] text-white shadow-xl shadow-indigo-100"
              : "bg-white"
              }`}
          >
            {plan.popular && (
              <span className="absolute right-6 top-6 rounded-full bg-[#7268ff] px-3 py-1 text-[11px] font-bold">
                MOST POPULAR
              </span>
            )}

            <p
              className={`text-sm font-bold ${plan.popular
                ? "text-indigo-200"
                : "text-[#625bf0]"
                }`}
            >
              {plan.name}
            </p>

            <p
              className={`mt-3 text-sm ${plan.popular
                ? "text-slate-300"
                : "text-slate-500"
                }`}
            >
              {plan.desc}
            </p>

            <div className="my-6">
              <span className="text-4xl font-black">
                ${yearly ? plan.y : plan.m}
              </span>

              <span className="text-slate-400">
                /mo
              </span>
            </div>

            <button
              className={`w-full rounded-xl py-3 font-bold ${plan.popular
                ? "bg-white text-[#10152b]"
                : "bg-[#10152b] text-white"
                }`}
            >
              Start 14-day trial
            </button>

            <ul className="mt-7 space-y-3">
              {plan.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm"
                >
                  <Check
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}