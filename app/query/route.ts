import postgres from 'postgres';

const postgresUrl = process.env.POSTGRES_URL!;
const isLocalDatabase =
  postgresUrl.includes('localhost') || postgresUrl.includes('127.0.0.1');
const sql = postgres(postgresUrl, { ssl: isLocalDatabase ? false : 'require' });

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
