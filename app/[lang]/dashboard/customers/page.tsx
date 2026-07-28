import { Metadata } from "next";
import { getDictionary, getLocale } from "@/app/lib/i18n";

export const metadata: Metadata = {
  title: "Customers | Acme Dashboard",
};

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);

  return <p>{dict.customers.page}</p>;
}
