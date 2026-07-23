"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const postgresUrl =
  process.env.POSTGRES_URL ??
  process.env["nextjs_dashboard_POSTGRES_URL"];

if (!postgresUrl) {
  throw new Error(
    "Database URL is missing. Set POSTGRES_URL or nextjs_dashboard_POSTGRES_URL.",
  );
}

const isLocalDatabase =
  postgresUrl.includes("localhost") || postgresUrl.includes("127.0.0.1");
const sql = postgres(postgresUrl, { ssl: isLocalDatabase ? false : "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");

  // Test it out:
  console.log({
    customerId,
    amountInCents,
    status,
    date,
  });
}
