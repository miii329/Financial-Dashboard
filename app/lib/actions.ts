"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getLocale, localizedPath, type Locale } from "@/app/lib/i18n";

const postgresUrl =
  process.env.POSTGRES_URL ?? process.env["nextjs_dashboard_POSTGRES_URL"];

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
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const locale = getLocale(formData.get("locale")?.toString());
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath(localizedPath(locale, "/dashboard/invoices"));
  redirect(localizedPath(locale, "/dashboard/invoices"));
}

export async function updateInvoice(id: string, formData: FormData) {
  const locale = getLocale(formData.get("locale")?.toString());
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    throw new Error("Database Error: Failed to Update Invoice.");
  }

  revalidatePath(localizedPath(locale, "/dashboard/invoices"));
  redirect(localizedPath(locale, "/dashboard/invoices"));
}

export async function deleteInvoice(id: string, locale: Locale) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath(localizedPath(locale, "/dashboard/invoices"));
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const locale = getLocale(formData.get("locale")?.toString());
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return locale === "ja"
            ? "認証情報が正しくありません。"
            : "Invalid credentials.";
        default:
          return locale === "ja" ? "問題が発生しました。" : "Something went wrong.";
      }
    }
    throw error;
  }
}
