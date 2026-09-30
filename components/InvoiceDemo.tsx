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
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
    >
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-[#f8f9ff] via-white to-[#f3fffb] px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10152b] text-white shadow-lg">
              <Receipt size={21} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Invoice workspace
              </p>

              <p className="mt-0.5 text-base font-bold text-slate-900">
                Create a professional invoice
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Database connected
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* CUSTOMER DETAILS */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles
              size={15}
              className="text-[#5b5cf0]"
            />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Customer details
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group">
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                Customer name
              </label>

              <input
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
                placeholder="Customer name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                Billing email
              </label>

              <input
                value={customerEmail}
                onChange={(event) =>
                  setCustomerEmail(
                    event.target.value
                  )
                }
                placeholder="billing@example.com"
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>
        </div>

        {/* INVOICE INFO */}
        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">
              SAC InvoicePro
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Professional billing workspace
            </p>
          </div>

          <div className="rounded-xl bg-white px-4 py-2.5 text-left shadow-sm sm:text-right">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Payment terms
            </p>

            <p className="mt-0.5 text-sm font-bold text-slate-800">
              Due in 15 days
            </p>
          </div>
        </div>

        {/* ITEMS */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Invoice items
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Add services or products to your invoice
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
              {items.length}{" "}
              {items.length === 1
                ? "item"
                : "items"}
            </span>
          </div>

          {/* DESKTOP HEADER */}
          <div className="mb-2 hidden grid-cols-[1fr_82px_120px_110px_36px] gap-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:grid">
            <span>Item / service</span>
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

          <div className="space-y-3">
            {items.map(
              (item, index) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-indigo-200 hover:shadow-[0_8px_25px_rgba(79,70,229,0.07)]"
                >
                  {/* MOBILE LABEL */}
                  <div className="mb-2 flex items-center justify-between sm:hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Item {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item.id
                        )
                      }
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2
                        size={15}
                      />
                    </button>
                  </div>

                  {/* DESKTOP GRID */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_82px_120px_110px_36px] sm:items-center sm:gap-2">
                    {/* NAME */}
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-slate-400 sm:hidden">
                        Item / service
                      </label>

                      <input
                        value={item.name}
                        onChange={(event) =>
                          updateItem(
                            item.id,
                            "name",
                            event.target
                              .value
                          )
                        }
                        placeholder="e.g. Website development"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      />
                    </div>

                    {/* QTY */}
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-slate-400 sm:hidden">
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
                            event.target
                              .value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-center text-sm font-semibold outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      />
                    </div>

                    {/* PRICE */}
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-slate-400 sm:hidden">
                        Unit price
                      </label>

                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
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
                              event.target
                                .value
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-7 pr-2 text-right text-sm font-semibold outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>
                    </div>

                    {/* AMOUNT */}
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 sm:block sm:bg-transparent sm:px-0 sm:py-0 sm:text-right">
                      <span className="text-xs text-slate-400 sm:hidden">
                        Amount
                      </span>

                      <span className="text-sm font-extrabold text-slate-900">
                        $
                        {(
                          item.qty *
                          item.price
                        ).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </span>
                    </div>

                    {/* DELETE */}
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
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* ADD ITEM */}
          <button
            type="button"
            onClick={add}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 py-3 text-sm font-bold text-[#5b5cf0] transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white shadow-sm transition group-hover:scale-105">
              <Plus size={15} />
            </span>

            Add another line item
          </button>
        </div>

        {/* TOTALS */}
        <div className="mt-7 flex justify-end">
          <div className="w-full rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:max-w-sm">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <b className="text-slate-800">
                  $
                  {subtotal.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </b>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  Discount
                </span>

                <div className="relative">
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
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
                            event.target
                              .value
                          ) || 0
                        )
                      )
                    }
                    type="number"
                    min="0"
                    className="w-24 rounded-lg border border-slate-200 bg-white py-1.5 pl-6 pr-2 text-right text-sm font-semibold outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Tax
                  <span className="ml-1 text-[10px]">
                    (10%)
                  </span>
                </span>

                <b className="text-slate-800">
                  $
                  {tax.toFixed(2)}
                </b>
              </div>

              <div className="my-2 border-t border-slate-200" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    Invoice total
                  </p>

                  <p className="mt-1 text-xl font-black tracking-tight text-slate-950">
                    $
                    {total.toFixed(2)}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  USD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <button
          disabled={saving}
          onClick={generate}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10152b] py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#171d3b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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
            ? "Creating your invoice..."
            : "Save & download PDF invoice"}
        </button>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mt-3 rounded-xl p-3 text-center text-xs font-semibold ${messageType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
              }`}
          >
            {messageType ===
              "success" ? (
              <Check
                size={14}
                className="mr-1 inline"
              />
            ) : null}

            {message}
          </div>
        )}
      </div>
    </div>
  );
}