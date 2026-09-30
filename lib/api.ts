export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function createInvoice(payload: unknown) {
  const response = await fetch(`${API_URL}/api/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create invoice"
    );
  }

  return data;
}