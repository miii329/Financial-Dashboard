import postgres from "postgres";

const connectionString =
  process.env.POSTGRES_URL ?? process.env.POSTGRES_DATABASE;

if (!connectionString) {
  throw new Error(
    "Database connection string is not set. Use POSTGRES_URL or POSTGRES_DATABASE.",
  );
}

const sql = postgres(connectionString, { ssl: "require" });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
