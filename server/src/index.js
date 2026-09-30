import "dotenv/config";

import express from "express";
import cors from "cors";
import PDFDocument from "pdfkit";

import { PrismaClient } from "@prisma/client";

const app = express();

const prisma =
  new PrismaClient();

const port = Number(
  process.env.PORT || 4000
);

const frontendUrl =
  process.env.FRONTEND_URL ||
  "http://localhost:3000";

/* -------------------------
   MIDDLEWARE
------------------------- */

app.use(
  cors({
    origin:
      frontendUrl
        .split(",")
        .map((value) =>
          value.trim()
        ),

    methods: [
      "GET",
      "POST",
      "PATCH",
      "OPTIONS",
    ],
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

/* -------------------------
   HELPERS
------------------------- */

const money = (
  value,
  currency = "USD"
) => {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
    }
  ).format(Number(value));
};

const nextInvoiceNumber =
  async () => {
    const count =
      await prisma.invoice.count();

    return `INV-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(4, "0")}`;
  };

/* -------------------------
   HEALTH
------------------------- */

app.get(
  "/api/health",
  async (_req, res) => {
    try {
      await prisma.$queryRaw`
        SELECT 1
      `;

      res.json({
        ok: true,
        service:
          "sac-invoicepro-api",
      });
    } catch {
      res
        .status(503)
        .json({
          ok: false,
        });
    }
  }
);

/* -------------------------
   LIST INVOICES
------------------------- */

app.get(
  "/api/invoices",
  async (_req, res) => {
    const invoices =
      await prisma.invoice.findMany(
        {
          include: {
            items: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        }
      );

    res.json(invoices);
  }
);

/* -------------------------
   GET SINGLE INVOICE
------------------------- */

app.get(
  "/api/invoices/:id",
  async (req, res) => {
    const invoice =
      await prisma.invoice.findUnique(
        {
          where: {
            id: req.params.id,
          },

          include: {
            items: true,
          },
        }
      );

    if (!invoice) {
      return res
        .status(404)
        .json({
          message:
            "Invoice not found",
        });
    }

    res.json(invoice);
  }
);

/* -------------------------
   CREATE INVOICE
------------------------- */

app.post(
  "/api/invoices",
  async (req, res) => {
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

      if (
        !customerName ||
        !customerName.trim()
      ) {
        return res
          .status(400)
          .json({
            message:
              "customerName is required",
          });
      }

      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "At least one invoice item is required",
          });
      }

      const cleanItems =
        items.map((item) => {
          const quantity =
            Number(
              item.quantity
            );

          const unitPrice =
            Number(
              item.unitPrice
            );

          if (
            !item.description ||
            !item.description.trim()
          ) {
            throw new Error(
              "Item description is required"
            );
          }

          if (
            !Number.isInteger(
              quantity
            ) ||
            quantity <= 0
          ) {
            throw new Error(
              "Quantity must be a positive integer"
            );
          }

          if (
            !Number.isFinite(
              unitPrice
            ) ||
            unitPrice < 0
          ) {
            throw new Error(
              "Unit price must be a valid positive number"
            );
          }

          return {
            description:
              item.description.trim(),

            quantity,

            unitPrice,

            lineTotal:
              quantity *
              unitPrice,
          };
        });

      const subtotal =
        cleanItems.reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.lineTotal,
          0
        );

      const safeDiscount =
        Math.min(
          Math.max(
            Number(
              discount
            ) || 0,
            0
          ),
          subtotal
        );

      const safeTaxRate =
        Math.max(
          Number(
            taxRate
          ) || 0,
          0
        );

      const tax =
        (subtotal -
          safeDiscount) *
        safeTaxRate /
        100;

      const total =
        subtotal -
        safeDiscount +
        tax;

      const invoiceNumber =
        await nextInvoiceNumber();

      const invoice =
        await prisma.invoice.create(
          {
            data: {
              invoiceNumber,

              customerName:
                customerName.trim(),

              customerEmail:
                customerEmail?.trim() ||
                null,

              customerPhone:
                customerPhone?.trim() ||
                null,

              dueDate:
                new Date(
                  dueDate ||
                    Date.now()
                ),

              discount:
                safeDiscount,

              taxRate:
                safeTaxRate,

              subtotal,

              tax,

              total,

              currency,

              items: {
                create:
                  cleanItems,
              },
            },

            include: {
              items: true,
            },
          }
        );

      res
        .status(201)
        .json(invoice);
    } catch (error) {
      console.error(
        error
      );

      res
        .status(400)
        .json({
          message:
            error.message ||
            "Unable to create invoice",
        });
    }
  }
);

/* -------------------------
   UPDATE STATUS
------------------------- */

app.patch(
  "/api/invoices/:id/status",
  async (req, res) => {
    const allowed = [
      "DRAFT",
      "SENT",
      "PAID",
      "OVERDUE",
    ];

    if (
      !allowed.includes(
        req.body.status
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid status",
        });
    }

    const invoice =
      await prisma.invoice.update(
        {
          where: {
            id: req.params.id,
          },

          data: {
            status:
              req.body.status,
          },
        }
      );

    res.json(invoice);
  }
);

/* -------------------------
   GENERATE PDF
------------------------- */

app.get(
  "/api/invoices/:id/pdf",
  async (req, res) => {
    const invoice =
      await prisma.invoice.findUnique(
        {
          where: {
            id: req.params.id,
          },

          include: {
            items: true,
          },
        }
      );

    if (!invoice) {
      return res
        .status(404)
        .json({
          message:
            "Invoice not found",
        });
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${invoice.invoiceNumber}.pdf"`
    );

    const doc =
      new PDFDocument({
        size: "A4",
        margin: 48,
      });

    doc.pipe(res);

    /* HEADER */

    doc
      .fillColor("#10152b")
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("SAC InvoicePro");

    doc
      .fillColor("#625bf0")
      .fontSize(11)
      .text(
        "Professional billing workspace"
      );

    doc.moveDown(2);

    /* INVOICE */

    doc
      .fillColor("#111827")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("INVOICE");

    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor("#64748b")
      .text(
        invoice.invoiceNumber
      );

    doc.moveDown();

    /* CUSTOMER */

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .text(
        invoice.customerName
      );

    if (
      invoice.customerEmail
    ) {
      doc
        .font("Helvetica")
        .fillColor("#64748b")
        .text(
          invoice.customerEmail
        );
    }

    if (
      invoice.customerPhone
    ) {
      doc.text(
        invoice.customerPhone
      );
    }

    doc.moveDown();

    doc
      .fillColor("#64748b")
      .text(
        `Due: ${new Date(
          invoice.dueDate
        ).toLocaleDateString(
          "en-US"
        )}`
      );

    doc.moveDown(2);

    /* TABLE */

    const startX = 48;

    const descX = 48;

    const qtyX = 350;

    const priceX = 405;

    const totalX = 485;

    doc
      .fillColor("#f1f5f9")
      .rect(
        startX,
        doc.y,
        499,
        28
      )
      .fill();

    const headerY =
      doc.y + 8;

    doc
      .fillColor("#334155")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(
        "DESCRIPTION",
        descX,
        headerY
      )
      .text(
        "QTY",
        qtyX,
        headerY
      )
      .text(
        "PRICE",
        priceX,
        headerY
      )
      .text(
        "TOTAL",
        totalX,
        headerY
      );

    doc.y += 38;

    for (
      const item of invoice.items
    ) {
      const y = doc.y;

      doc
        .fillColor("#111827")
        .fontSize(10)
        .font("Helvetica")
        .text(
          item.description,
          descX,
          y,
          {
            width: 290,
          }
        );

      doc.text(
        String(
          item.quantity
        ),
        qtyX,
        y
      );

      doc.text(
        money(
          item.unitPrice,
          invoice.currency
        ),
        priceX,
        y
      );

      doc.text(
        money(
          item.lineTotal,
          invoice.currency
        ),
        totalX,
        y
      );

      doc
        .moveTo(
          startX,
          y + 20
        )
        .lineTo(
          547,
          y + 20
        )
        .strokeColor(
          "#e2e8f0"
        )
        .stroke();

      doc.y += 32;
    }

    /* TOTALS */

    doc.moveDown();

    const right = 370;

    doc
      .fillColor("#475569")
      .fontSize(10)
      .text(
        `Subtotal: ${money(
          invoice.subtotal,
          invoice.currency
        )}`,
        right,
        doc.y,
        {
          width: 177,
          align: "right",
        }
      );

    doc.text(
      `Discount: -${money(
        invoice.discount,
        invoice.currency
      )}`,
      right,
      doc.y + 18,
      {
        width: 177,
        align: "right",
      }
    );

    doc.text(
      `Tax (${Number(
        invoice.taxRate
      )}%): ${money(
        invoice.tax,
        invoice.currency
      )}`,
      right,
      doc.y + 36,
      {
        width: 177,
        align: "right",
      }
    );

    doc
      .fillColor("#10152b")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(
        `Total: ${money(
          invoice.total,
          invoice.currency
        )}`,
        right,
        doc.y + 68,
        {
          width: 177,
          align: "right",
        }
      );

    /* FOOTER */

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#94a3b8")
      .text(
        "Generated by SAC InvoicePro",
        48,
        760
      );

    doc.end();
  }
);

/* -------------------------
   ERROR HANDLER
------------------------- */

app.use(
  (
    error,
    _req,
    res,
    _next
  ) => {
    console.error(error);

    res
      .status(500)
      .json({
        message:
          "Internal server error",
      });
  }
);

/* -------------------------
   START SERVER
------------------------- */

app.listen(
  port,
  () => {
    console.log(
      `SAC InvoicePro API running on port ${port}`
    );
  }
);