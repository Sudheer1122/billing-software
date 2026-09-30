import "dotenv/config";

import express from "express";
import cors from "cors";
import PDFDocument from "pdfkit";

import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

const port = Number(process.env.PORT || 4000);

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

/* -------------------------
   MIDDLEWARE
------------------------- */

app.use(
  cors({
    origin: frontendUrl.split(",").map((value) => value.trim()),

    methods: ["GET", "POST", "PATCH", "OPTIONS"],
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

/* -------------------------
   HELPERS
------------------------- */

const money = (value, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(value));
};

const nextInvoiceNumber = async () => {
  const count = await prisma.invoice.count();

  return `INV-${new Date().getFullYear()}-${String(count + 1).padStart(
    4,
    "0",
  )}`;
};

/* -------------------------
   HEALTH
------------------------- */

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`
        SELECT 1
      `;

    res.json({
      ok: true,
      service: "sac-invoicepro-api",
    });
  } catch {
    res.status(503).json({
      ok: false,
    });
  }
});

/* -------------------------
   LIST INVOICES
------------------------- */

app.get("/api/invoices", async (_req, res) => {
  const invoices = await prisma.invoice.findMany({
    include: {
      items: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(invoices);
});

/* -------------------------
   GET SINGLE INVOICE
------------------------- */

app.get("/api/invoices/:id", async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      items: true,
    },
  });

  if (!invoice) {
    return res.status(404).json({
      message: "Invoice not found",
    });
  }

  res.json(invoice);
});

/* -------------------------
   CREATE INVOICE
------------------------- */

app.post("/api/invoices", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      dueDate,
      discount = 0,
      taxRate = 10,
      currency = "USD",
      items = [],
    } = req.body;

    if (!customerName || !customerName.trim()) {
      return res.status(400).json({
        message: "customerName is required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one invoice item is required",
      });
    }

    const cleanItems = items.map((item) => {
      const quantity = Number(item.quantity);

      const unitPrice = Number(item.unitPrice);

      if (!item.description || !item.description.trim()) {
        throw new Error("Item description is required");
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
      }

      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        throw new Error("Unit price must be a valid positive number");
      }

      return {
        description: item.description.trim(),

        quantity,

        unitPrice,

        lineTotal: quantity * unitPrice,
      };
    });

    const subtotal = cleanItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const safeDiscount = Math.min(Math.max(Number(discount) || 0, 0), subtotal);

    const safeTaxRate = Math.max(Number(taxRate) || 0, 0);

    const tax = ((subtotal - safeDiscount) * safeTaxRate) / 100;

    const total = subtotal - safeDiscount + tax;

    const invoiceNumber = await nextInvoiceNumber();

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,

        customerName: customerName.trim(),

        customerEmail: customerEmail?.trim() || null,

        customerPhone: customerPhone?.trim() || null,

        dueDate: new Date(dueDate || Date.now()),

        discount: safeDiscount,

        taxRate: safeTaxRate,

        subtotal,

        tax,

        total,

        currency,

        items: {
          create: cleanItems,
        },
      },

      include: {
        items: true,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message || "Unable to create invoice",
    });
  }
});

/* -------------------------
   UPDATE STATUS
------------------------- */

app.patch("/api/invoices/:id/status", async (req, res) => {
  const allowed = ["DRAFT", "SENT", "PAID", "OVERDUE"];

  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  const invoice = await prisma.invoice.update({
    where: {
      id: req.params.id,
    },

    data: {
      status: req.body.status,
    },
  });

  res.json(invoice);
});

/* -------------------------
   GENERATE PDF
------------------------- */
app.get("/api/invoices/:id/pdf", async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    /* --------------------------------
         PDF RESPONSE HEADERS
      -------------------------------- */

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${invoice.invoiceNumber}.pdf"`,
    );

    /* --------------------------------
         DOCUMENT
      -------------------------------- */

    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      bufferPages: true,
    });

    doc.pipe(res);

    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;

    const LEFT = 48;
    const RIGHT = 547;

    /* --------------------------------
         COLORS
      -------------------------------- */

    const COLORS = {
      navy: "#10152B",
      primary: "#5B5CF0",
      violet: "#7C3AED",
      text: "#111827",
      muted: "#64748B",
      lightMuted: "#94A3B8",
      border: "#E2E8F0",
      light: "#F8FAFC",
      lighter: "#F1F5F9",
      white: "#FFFFFF",
      green: "#059669",
      greenBg: "#ECFDF5",
      red: "#DC2626",
      redBg: "#FEF2F2",
    };

    /* --------------------------------
         HELPERS
      -------------------------------- */

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const drawRoundedRect = (x, y, width, height, radius, fill, stroke) => {
      doc.roundedRect(x, y, width, height, radius);

      if (fill) {
        doc.fillColor(fill).fill();
      }

      if (stroke) {
        doc.lineWidth(1).strokeColor(stroke).stroke();
      }
    };

    const drawLabel = (text, x, y, options = {}) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(options.size || 8)
        .fillColor(options.color || COLORS.lightMuted)
        .text(text.toUpperCase(), x, y, options);
    };

    const drawValue = (text, x, y, options = {}) => {
      doc
        .font(options.bold ? "Helvetica-Bold" : "Helvetica")
        .fontSize(options.size || 10)
        .fillColor(options.color || COLORS.text)
        .text(text, x, y, options);
    };

    /* --------------------------------
         TOP BRAND HEADER
      -------------------------------- */

    doc.rect(0, 0, PAGE_WIDTH, 112).fillColor(COLORS.navy).fill();

    /* Brand icon */

    drawRoundedRect(LEFT, 30, 42, 42, 12, COLORS.primary);

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor(COLORS.white)
      .text("S", LEFT + 13, 40);

    /* Brand name */

    doc
      .font("Helvetica-Bold")
      .fontSize(17)
      .fillColor(COLORS.white)
      .text("SAC InvoicePro", LEFT + 55, 31);

    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor("#CBD5E1")
      .text("Professional billing workspace", LEFT + 55, 53);

    /* Invoice label */

    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor(COLORS.white)
      .text("INVOICE", 400, 32, {
        width: 147,
        align: "right",
      });

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#CBD5E1")
      .text(invoice.invoiceNumber, 400, 65, {
        width: 147,
        align: "right",
      });

    /* --------------------------------
         MAIN CONTENT
      -------------------------------- */

    let currentY = 140;

    /* --------------------------------
         BILL TO CARD
      -------------------------------- */

    const cardHeight = 100;

    drawRoundedRect(
      LEFT,
      currentY,
      320,
      cardHeight,
      12,
      COLORS.light,
      COLORS.border,
    );

    drawLabel("Bill To", LEFT + 16, currentY + 16);

    drawValue(invoice.customerName, LEFT + 16, currentY + 37, {
      bold: true,
      size: 12,
    });

    if (invoice.customerEmail) {
      drawValue(invoice.customerEmail, LEFT + 16, currentY + 58, {
        color: COLORS.muted,
        size: 9,
      });
    }

    if (invoice.customerPhone) {
      drawValue(invoice.customerPhone, LEFT + 16, currentY + 74, {
        color: COLORS.muted,
        size: 9,
      });
    }

    /* --------------------------------
         INVOICE INFO CARD
      -------------------------------- */

    const infoX = 380;
    const infoWidth = RIGHT - infoX;

    drawRoundedRect(
      infoX,
      currentY,
      infoWidth,
      cardHeight,
      12,
      COLORS.light,
      COLORS.border,
    );

    drawLabel("Invoice details", infoX + 16, currentY + 16);

    drawLabel("Invoice date", infoX + 16, currentY + 39, {
      size: 7,
    });

    drawValue(formatDate(invoice.createdAt), infoX + 82, currentY + 38, {
      size: 8.5,
    });

    drawLabel("Due date", infoX + 16, currentY + 58, {
      size: 7,
    });

    drawValue(formatDate(invoice.dueDate), infoX + 82, currentY + 57, {
      size: 8.5,
    });

    /* STATUS */

    const status = invoice.status || "DRAFT";

    const statusUpper = status.toUpperCase();

    const statusIsPaid = statusUpper === "PAID";

    const statusColor = statusIsPaid ? COLORS.green : COLORS.primary;

    const statusBg = statusIsPaid ? COLORS.greenBg : "#EEF2FF";

    const statusWidth = statusUpper.length * 5.7 + 22;

    drawRoundedRect(infoX + 16, currentY + 75, statusWidth, 16, 8, statusBg);

    doc
      .font("Helvetica-Bold")
      .fontSize(7)
      .fillColor(statusColor)
      .text(statusUpper, infoX + 27, currentY + 80);

    currentY += 124;

    /* --------------------------------
         ITEMS SECTION
      -------------------------------- */

    drawLabel("Invoice items", LEFT, currentY, {
      color: COLORS.text,
      size: 9,
    });

    currentY += 18;

    /* TABLE HEADER */

    const tableX = LEFT;
    const tableWidth = RIGHT - LEFT;

    drawRoundedRect(tableX, currentY, tableWidth, 32, 8, COLORS.navy);

    const descX = tableX + 14;

    const qtyX = 365;

    const priceX = 415;

    const totalX = 485;

    doc
      .font("Helvetica-Bold")
      .fontSize(7.5)
      .fillColor(COLORS.white)
      .text("DESCRIPTION", descX, currentY + 11)
      .text("QTY", qtyX, currentY + 11)
      .text("UNIT PRICE", priceX, currentY + 11)
      .text("AMOUNT", totalX, currentY + 11);

    currentY += 32;

    /* --------------------------------
         TABLE ROWS
      -------------------------------- */

    invoice.items.forEach((item, index) => {
      const rowHeight = 40;

      if (index % 2 === 0) {
        doc
          .rect(tableX, currentY, tableWidth, rowHeight)
          .fillColor("#F8FAFC")
          .fill();
      }

      /* Description */

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.text)
        .text(item.description, descX, currentY + 14, {
          width: 285,
          ellipsis: true,
        });

      /* Quantity */

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.muted)
        .text(String(item.quantity), qtyX, currentY + 14);

      /* Unit price */

      doc.text(money(item.unitPrice, invoice.currency), priceX, currentY + 14);

      /* Amount */

      doc
        .font("Helvetica-Bold")
        .fillColor(COLORS.text)
        .text(money(item.lineTotal, invoice.currency), totalX, currentY + 14);

      doc
        .moveTo(tableX, currentY + rowHeight)
        .lineTo(RIGHT, currentY + rowHeight)
        .lineWidth(0.6)
        .strokeColor(COLORS.border)
        .stroke();

      currentY += rowHeight;
    });

    /* --------------------------------
         SUMMARY
      -------------------------------- */

    currentY += 25;

    const summaryX = 335;
    const summaryWidth = RIGHT - summaryX;

    drawRoundedRect(
      summaryX,
      currentY,
      summaryWidth,
      158,
      14,
      COLORS.light,
      COLORS.border,
    );

    drawLabel("Payment summary", summaryX + 16, currentY + 16, {
      color: COLORS.text,
      size: 8,
    });

    const summaryRight = RIGHT - 16;

    let summaryY = currentY + 42;

    /* SUBTOTAL */

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text("Subtotal", summaryX + 16, summaryY);

    doc
      .font("Helvetica-Bold")
      .fillColor(COLORS.text)
      .text(
        money(invoice.subtotal, invoice.currency),
        summaryX + 130,
        summaryY,
        {
          width: summaryRight - (summaryX + 130),
          align: "right",
        },
      );

    summaryY += 23;

    /* DISCOUNT */

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text("Discount", summaryX + 16, summaryY);

    doc
      .font("Helvetica-Bold")
      .fillColor(COLORS.red)
      .text(
        `-${money(invoice.discount, invoice.currency)}`,
        summaryX + 130,
        summaryY,
        {
          width: summaryRight - (summaryX + 130),
          align: "right",
        },
      );

    summaryY += 23;

    /* TAX */

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(COLORS.muted)
      .text(`Tax (${Number(invoice.taxRate)}%)`, summaryX + 16, summaryY);

    doc
      .font("Helvetica-Bold")
      .fillColor(COLORS.text)
      .text(money(invoice.tax, invoice.currency), summaryX + 130, summaryY, {
        width: summaryRight - (summaryX + 130),
        align: "right",
      });

    summaryY += 28;

    /* DIVIDER */

    doc
      .moveTo(summaryX + 16, summaryY)
      .lineTo(summaryRight, summaryY)
      .lineWidth(0.7)
      .strokeColor(COLORS.border)
      .stroke();

    summaryY += 17;

    /* TOTAL BACKGROUND */

    drawRoundedRect(
      summaryX + 10,
      summaryY - 7,
      summaryWidth - 20,
      38,
      9,
      COLORS.navy,
    );

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(COLORS.white)
      .text("TOTAL", summaryX + 22, summaryY + 6);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor(COLORS.white)
      .text(
        money(invoice.total, invoice.currency),
        summaryX + 110,
        summaryY + 3,
        {
          width: summaryWidth - 130,
          align: "right",
        },
      );

    /* --------------------------------
         PAYMENT TERMS
      -------------------------------- */

    currentY += 185;

    drawRoundedRect(LEFT, currentY, 499, 72, 12, "#F5F3FF", "#EDE9FE");

    drawRoundedRect(LEFT + 16, currentY + 16, 38, 38, 10, COLORS.primary);

    doc
      .font("Helvetica-Bold")
      .fontSize(15)
      .fillColor(COLORS.white)
      .text("$", LEFT + 29, currentY + 27);

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(COLORS.text)
      .text("Payment terms", LEFT + 68, currentY + 17);

    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(COLORS.muted)
      .text(
        `Payment is due by ${formatDate(
          invoice.dueDate,
        )}. Please include the invoice number when making payment.`,
        LEFT + 68,
        currentY + 34,
        {
          width: 405,
        },
      );

    /* --------------------------------
         FOOTER
      -------------------------------- */

    const footerY = PAGE_HEIGHT - 65;

    doc
      .moveTo(LEFT, footerY)
      .lineTo(RIGHT, footerY)
      .lineWidth(0.7)
      .strokeColor(COLORS.border)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor(COLORS.navy)
      .text("SAC InvoicePro", LEFT, footerY + 16);

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(COLORS.lightMuted)
      .text(
        "Simple invoicing. Clear finances. Better business.",
        LEFT,
        footerY + 29,
      );

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor(COLORS.lightMuted)
      .text(`Generated ${formatDate(new Date())}`, 390, footerY + 22, {
        width: 157,
        align: "right",
      });

    /* --------------------------------
         PAGE NUMBERS
      -------------------------------- */

    const range = doc.bufferedPageRange();

    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);

      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor(COLORS.lightMuted)
        .text(`Page ${i + 1} of ${range.count}`, 48, PAGE_HEIGHT - 28, {
          width: 499,
          align: "right",
        });
    }

    /* --------------------------------
         END PDF
      -------------------------------- */

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Unable to generate invoice PDF",
      });
    }
  }
});

/* -------------------------
   ERROR HANDLER
------------------------- */

app.use((error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
});

/* -------------------------
   START SERVER
------------------------- */

app.listen(port, () => {
  console.log(`SAC InvoicePro API running on port ${port}`);
});
