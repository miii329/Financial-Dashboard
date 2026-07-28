import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import { getDictionary, getLocale, localizedPath } from "@/app/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: dict.invoices.title, href: localizedPath(locale, "/dashboard/invoices") },
          {
            label: dict.invoices.create,
            href: localizedPath(locale, "/dashboard/invoices/create"),
            active: true,
          },
        ]}
      />
      <Form customers={customers} locale={locale} labels={dict.invoices} />
    </main>
  );
}
