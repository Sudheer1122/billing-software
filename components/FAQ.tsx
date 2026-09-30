"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";
import { faqs } from "../lib/data";

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
      {faqs.map(([question, answer], index) => (
        <div
          key={question}
          className="px-6"
        >
          <button
            className="flex w-full items-center justify-between gap-6 py-6 text-left font-bold"
            onClick={() =>
              setActive(
                active === index ? -1 : index
              )
            }
          >
            <span>{question}</span>

            <ChevronDown
              size={20}
              className={
                active === index
                  ? "rotate-180 transition"
                  : "transition"
              }
            />
          </button>

          {active === index && (
            <p className="pb-6 pr-8 text-sm leading-7 text-slate-500">
              {answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}