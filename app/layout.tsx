import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAC InvoicePro — Billing that moves business forward",
  description:
    "Modern invoicing, payments and business insights for growing teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}