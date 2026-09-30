import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const today = new Date();

const due = new Date(today);

due.setDate(due.getDate() + 15);

const existing = await prisma.invoice.findUnique({
  where: {
    invoiceNumber: "INV-DEMO-001",
  },
});

if (!existing) {
  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-DEMO-001",

      customerName: "Northstar Studio",

      customerEmail: "billing@northstar.example",

      dueDate: due,

      subtotal: 3100,

      tax: 310,

      total: 3410,

      items: {
        create: [
          {
            description: "Website retainer",

            quantity: 1,

            unitPrice: 1200,

            lineTotal: 1200,
          },

          {
            description: "Product design",

            quantity: 2,

            unitPrice: 480,

            lineTotal: 960,
          },

          {
            description: "Support hours",

            quantity: 4,

            unitPrice: 235,

            lineTotal: 940,
          },
        ],
      },
    },
  });
}

await prisma.$disconnect();
