"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Check,
  Download,
  Loader2,
} from "./icons";

import {
  API_URL,
  createInvoice,
} from "../lib/api";

type Item = {
  name: string;
  qty: number;
  price: number;
};

export default function InvoiceDemo() {
  const [items, setItems] = useState<Item[]>([
    {
      name: "Website retainer",
      qty: 1,
      price: 1200,
    },
    {
      name: "Product design",
      qty: 2,
      price: 480,
    },
    {
      name: "Support hours",
      qty: 4,
      price: 95,
    },
  ]);

  const [discount, setDiscount] =
    useState(0);

  const [customerName, setCustomerName] =
    useState("Northstar Studio");

  const [customerEmail, setCustomerEmail] =
    useState(
      "billing@northstar.example"
    );

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.qty * item.price,
        0
      ),
    [items]
  );

  const taxableAmount =
    Math.max(
      subtotal - discount,
      0
    );

  const tax =
    taxableAmount * 0.1;

  const total =
    taxableAmount + tax;

  const add = () => {
    setItems([
      ...items,
      {
        name: "New service",
        qty: 1,
        price: 250,
      },
    ]);
  };

  const generate = async () => {
    setSaving(true);
    setMessage("");

    try {
      const due = new Date();

      due.setDate(
        due.getDate() + 15
      );

      const invoice =
        await createInvoice({
          customerName,
          customerEmail,
          dueDate:
            due.toISOString(),
          discount,
          taxRate: 10,
          currency: "USD",
          items: items.map(
            (item) => ({
              description:
                item.name,
              quantity:
                item.qty,
              unitPrice:
                item.price,
            })
          ),
        });

      const response =
        await fetch(
          `${API_URL}/api/invoices/${invoice.id}/pdf`
        );

      if (!response.ok) {
        throw new Error(
          "PDF generation failed"
        );
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(blob);

      const anchor =
        document.createElement(
          "a"
        );

      anchor.href = url;

      anchor.download =
        `${invoice.invoiceNumber}.pdf`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      setMessage(
        `${invoice.invoiceNumber} saved to the database and PDF downloaded.`
      );
    } catch (error: any) {
      setMessage(
        error?.message ||
          "Unable to create invoice"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      id="demo"
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft"
    >
      <div className="flex items-center justify-between border-b bg-[#fafbff] px-5 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">
            Live invoice generator
          </p>

          <p className="mt-1 font-bold">
            Create a real invoice
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          Database connected
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <input
            value={customerName}
            onChange={(event) =>
              setCustomerName(
                event.target.value
              )
            }
            placeholder="Customer name"
            className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
          />

          <input
            value={customerEmail}
            onChange={(event) =>
              setCustomerEmail(
                event.target.value
              )
            }
            placeholder="Customer email"
            className="rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <div className="mb-7 flex justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              SAC InvoicePro
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Professional billing workspace
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">
              Due date
            </p>

            <p className="text-sm font-semibold">
              15 days from creation
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {items.map(
            (item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_48px_80px] items-center gap-2 rounded-xl border border-slate-100 p-3"
              >
                <div className="text-sm font-medium">
                  {item.name}
                </div>

                <div className="text-center text-xs text-slate-500">
                  ×{item.qty}
                </div>

                <div className="text-right text-sm font-bold">
                  $
                  {(
                    item.qty *
                    item.price
                  ).toLocaleString()}
                </div>
              </div>
            )
          )}
        </div>

        <button
          onClick={add}
          className="mt-4 flex items-center gap-2 text-sm font-bold text-[#5b5cf0] hover:underline"
        >
          <Plus size={16} />
          Add line item
        </button>

        <div className="ml-auto mt-6 max-w-xs space-y-2 border-t pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">
              Subtotal
            </span>

            <b>
              $
              {subtotal.toLocaleString()}
            </b>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">
              Discount
            </span>

            <input
              aria-label="Discount"
              value={discount}
              onChange={(event) =>
                setDiscount(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    ) || 0
                  )
                )
              }
              type="number"
              className="w-24 rounded-lg border px-2 py-1 text-right"
            />
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Tax (10%)
            </span>

            <b>
              ${tax.toFixed(2)}
            </b>
          </div>

          <div className="flex justify-between pt-2 text-lg">
            <span className="font-bold">
              Total
            </span>

            <b>
              ${total.toFixed(2)}
            </b>
          </div>
        </div>

        <button
          disabled={saving}
          onClick={generate}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10152b] py-3.5 font-bold text-white disabled:opacity-60"
        >
          {saving ? (
            <Loader2
              className="animate-spin"
              size={17}
            />
          ) : (
            <Download size={17} />
          )}

          {saving
            ? "Generating..."
            : "Save & download PDF invoice"}
        </button>

        {message && (
          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-700">
            <Check
              size={14}
              className="mr-1 inline"
            />

            {message}
          </div>
        )}
      </div>
    </div>
  );
}