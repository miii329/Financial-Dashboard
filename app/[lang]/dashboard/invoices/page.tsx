import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next";
import { getDictionary, getLocale } from "@/app/lib/i18n";

export const metadata: Metadata = {
  title: "Invoices | Acme Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const { lang } = await props.params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {dict.invoices.title}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={dict.invoices.searchPlaceholder} />
        <CreateInvoice locale={locale} label={dict.invoices.create} />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} labels={dict.invoices} locale={locale} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
