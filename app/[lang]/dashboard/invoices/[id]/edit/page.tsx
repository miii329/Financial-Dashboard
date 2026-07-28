import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { getDictionary, getLocale, localizedPath } from "@/app/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Page(props: { params: Promise<{ id: string; lang: string }> }) {
  const params = await props.params;
  const id = params.id;
  const locale = getLocale(params.lang);
  const dict = getDictionary(locale);
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: dict.invoices.title, href: localizedPath(locale, "/dashboard/invoices") },
          {
            label: dict.invoices.edit,
            href: localizedPath(locale, `/dashboard/invoices/${id}/edit`),
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} locale={locale} labels={dict.invoices} />
    </main>
  );
}
