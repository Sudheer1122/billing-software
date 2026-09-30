"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Check,
  Download,
  Loader2,
  Trash2,
  Sparkles,
  Receipt,
  UserRound,
  Mail,
  CalendarDays,
  Percent,
  ArrowRight,
  FileText,
  CircleDollarSign,
} from "lucide-react";

import {
  API_URL,
  createInvoice,
} from "../lib/api";

type Item = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

const createItem = (): Item => ({
  id: crypto.randomUUID(),
  name: "",
  qty: 1,
  price: 0,
});

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function InvoiceDemo() {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Website retainer",
      qty: 1,
      price: 1200,
    },
    {
      id: "2",
      name: "Product design",
      qty: 2,
      price: 480,
    },
    {
      id: "3",
      name: "Support hours",
      qty: 4,
      price: 95,
    },
  ]);

  const [discount, setDiscount] = useState(0);

  const [customerName, setCustomerName] =
    useState("Northstar Studio");

  const [customerEmail, setCustomerEmail] =
    useState("billing@northstar.example");

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.qty * item.price,
        0
      ),
    [items]
  );

  const taxableAmount = Math.max(
    subtotal - discount,
    0
  );

  const tax = taxableAmount * 0.1;

  const total = taxableAmount + tax;

  const add = () => {
    setItems((current) => [
      ...current,
      createItem(),
    ]);

    setMessage("");
  };

  const updateItem = (
    id: string,
    field: keyof Item,
    value: string
  ) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        if (field === "name") {
          return {
            ...item,
            name: value,
          };
        }

        if (field === "qty") {
          return {
            ...item,
            qty: Math.max(
              1,
              Number(value) || 1
            ),
          };
        }

        if (field === "price") {
          return {
            ...item,
            price: Math.max(
              0,
              Number(value) || 0
            ),
          };
        }

        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    if (items.length === 1) {
      setMessageType("error");

      setMessage(
        "At least one invoice item is required."
      );

      return;
    }

    setItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    setMessage("");
  };

  const generate = async () => {
    const invalidItem = items.some(
      (item) =>
        !item.name.trim() ||
        item.qty <= 0 ||
        item.price < 0
    );

    if (invalidItem) {
      setMessageType("error");

      setMessage(
        "Please enter an item name, quantity and price for every line item."
      );

      return;
    }

    if (!customerName.trim()) {
      setMessageType("error");

      setMessage(
        "Please enter a customer name."
      );

      return;
    }

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
                item.name.trim(),
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

      setMessageType("success");

      setMessage(
        `${invoice.invoiceNumber} saved successfully and PDF downloaded.`
      );
    } catch (error: any) {
      setMessageType("error");

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
      className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[#f8f9fc] shadow-[0_35px_100px_rgba(15,23,42,0.12)]"
    >
      <div className="relative overflow-hidden border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#10152b] text-white shadow-lg shadow-slate-300/50">
              <Receipt size={21} />

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#625bf0] ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#625bf0]">
                  Invoice workspace
                </p>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-400">
                  LIVE
                </span>
              </div>

              <h3 className="mt-1 text-lg font-black tracking-tight text-[#10152b]">
                Create a professional invoice
              </h3>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-bold text-emerald-700">
              Database connected
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_330px] lg:p-7">
        <div className="min-w-0">
          {/* CUSTOMER CARD */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#625bf0]/10 text-[#625bf0]">
                  <UserRound size={17} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    Customer details
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Who is this invoice for?
                  </p>
                </div>
              </div>

              <span className="hidden rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 sm:block">
                Required
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500">
                  Customer name
                </label>

                <div className="relative">
                  <UserRound
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(
                        event.target.value
                      )
                    }
                    placeholder="Customer name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500">
                  Billing email
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={customerEmail}
                    onChange={(event) =>
                      setCustomerEmail(
                        event.target.value
                      )
                    }
                    placeholder="billing@example.com"
                    type="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ITEMS CARD */}
          <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-[#625bf0]">
                  <FileText size={17} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    Invoice items
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Add products or services
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                {items.length}{" "}
                {items.length === 1
                  ? "item"
                  : "items"}
              </div>
            </div>

            {/* Desktop column labels */}
            <div className="mb-2 hidden grid-cols-[1fr_74px_118px_110px_34px] gap-2 px-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 sm:grid">
              <span>Description</span>

              <span className="text-center">
                Qty
              </span>

              <span className="text-right">
                Unit price
              </span>

              <span className="text-right">
                Amount
              </span>

              <span />
            </div>

            {/* Items */}
            <div className="space-y-3">
              {items.map(
                (item, index) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-3 transition duration-200 hover:border-[#625bf0]/25 hover:shadow-[0_10px_30px_rgba(98,91,240,0.07)]"
                  >
                    {/* Mobile top */}
                    <div className="mb-3 flex items-center justify-between sm:hidden">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#625bf0]/10 text-[10px] font-black text-[#625bf0]">
                          {index + 1}
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Line item
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[1fr_74px_118px_110px_34px] sm:items-center sm:gap-2">
                      {/* DESCRIPTION */}
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold text-slate-400 sm:hidden">
                          Item / service
                        </label>

                        <input
                          value={item.name}
                          onChange={(event) =>
                            updateItem(
                              item.id,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Website development"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                        />
                      </div>

                      {/* QTY */}
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold text-slate-400 sm:hidden">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(event) =>
                            updateItem(
                              item.id,
                              "qty",
                              event.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-center text-sm font-bold outline-none transition focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                        />
                      </div>

                      {/* PRICE */}
                      <div>
                        <label className="mb-1.5 block text-[10px] font-bold text-slate-400 sm:hidden">
                          Unit price
                        </label>

                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                            $
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "price",
                                event.target.value
                              )
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-7 pr-2 text-right text-sm font-bold outline-none transition focus:border-[#625bf0] focus:bg-white focus:ring-4 focus:ring-[#625bf0]/10"
                          />
                        </div>
                      </div>

                      {/* AMOUNT */}
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 sm:block sm:bg-transparent sm:px-0 sm:py-0 sm:text-right">
                        <span className="text-[10px] font-semibold text-slate-400 sm:hidden">
                          Amount
                        </span>

                        <span className="text-sm font-black text-slate-900">
                          $
                          {formatMoney(
                            item.qty *
                            item.price
                          )}
                        </span>
                      </div>

                      {/* DESKTOP DELETE */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="hidden h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-red-50 hover:text-red-500 sm:flex"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Add */}
            <button
              type="button"
              onClick={add}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#625bf0]/30 bg-[#625bf0]/5 py-3 text-xs font-black text-[#625bf0] transition hover:border-[#625bf0]/50 hover:bg-[#625bf0]/10"
            >
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white shadow-sm transition group-hover:scale-110">
                <Plus size={14} />
              </span>

              Add another line item
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
            {/* Summary header */}
            <div className="relative overflow-hidden bg-[#10152b] px-5 py-5 text-white">
              <div className="absolute right-[-25px] top-[-30px] h-28 w-28 rounded-full bg-[#625bf0]/40 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-200">
                    Invoice preview
                  </p>

                  <p className="mt-1 text-lg font-black">
                    SAC InvoicePro
                  </p>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Receipt size={18} />
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
                <span className="text-[10px] text-slate-400">
                  Status
                </span>

                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Draft
                </span>
              </div>
            </div>

            <div className="p-5">
              {/* Customer */}
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Bill to
                </p>

                <p className="mt-2 text-sm font-black text-slate-900">
                  {customerName ||
                    "Customer name"}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {customerEmail ||
                    "billing@example.com"}
                </p>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <CalendarDays size={13} />
                    Payment terms
                  </span>

                  <span className="font-bold text-slate-700">
                    Net 15
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <CircleDollarSign size={13} />
                    Currency
                  </span>

                  <span className="font-bold text-slate-700">
                    USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <FileText size={13} />
                    Line items
                  </span>

                  <span className="font-bold text-slate-700">
                    {items.length}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-dashed border-slate-200" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-slate-800">
                    ${formatMoney(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Percent size={13} />
                    Discount
                  </span>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      $
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
                      min="0"
                      className="w-24 rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-6 pr-2 text-right text-xs font-bold outline-none focus:border-[#625bf0] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Tax
                    <span className="ml-1 text-[10px]">
                      10%
                    </span>
                  </span>

                  <span className="font-bold text-slate-800">
                    ${formatMoney(tax)}
                  </span>
                </div>
              </div>

              {/* Grand total */}
              <div className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#625bf0] to-[#7c3aed] p-4 text-white shadow-lg shadow-[#625bf0]/20">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-100">
                      Total due
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight">
                      ${formatMoney(total)}
                    </p>
                  </div>

                  <div className="rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold">
                    USD
                  </div>
                </div>
              </div>

              {/* Generate */}
              <button
                disabled={saving}
                onClick={generate}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10152b] py-3.5 text-xs font-black text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#625bf0] hover:shadow-[#625bf0]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      className="animate-spin"
                      size={16}
                    />

                    Creating invoice...
                  </>
                ) : (
                  <>
                    <Download size={16} />

                    Save & download PDF

                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              {/* Security */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] font-semibold text-slate-400">
                <Sparkles
                  size={11}
                  className="text-[#625bf0]"
                />

                Your invoice is generated securely
              </div>
            </div>
          </div>
        </aside>
      </div>

      {message && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold ${messageType === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
              }`}
          >
            {messageType === "success" && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100">
                <Check size={12} />
              </span>
            )}

            {messageType === "error" && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-red-100">
                !
              </span>
            )}

            {message}
          </div>
        </div>
      )}
    </div>
  );
}