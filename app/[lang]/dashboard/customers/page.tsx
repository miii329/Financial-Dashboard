import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: "Customers | Acme Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  await props.params;
  const customers = await fetchFilteredCustomers("");
  const pastCustomers = customers.filter(
    (customer) => Number(customer.total_invoices) > 0,
  );

  return <CustomersTable customers={pastCustomers} />;
}
