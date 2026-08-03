import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "@/app/ui/skeletons";
import { getDictionary, getLocale } from "@/app/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {dict.dashboard.title}
      </h1>
      <p>月次</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title={dict.dashboard.collected}
          value={totalPaidInvoices}
          type="collected"
        />
        <Card
          title={dict.dashboard.pending}
          value={totalPendingInvoices}
          type="pending"
        />
        <Card
          title={dict.dashboard.totalInvoices}
          value={numberOfInvoices}
          type="invoices"
        />
        <Card
          title={dict.dashboard.totalCustomers}
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart
            revenue={revenue}
            title={dict.dashboard.recentRevenue}
            emptyText={dict.dashboard.noData}
            footerText={dict.dashboard.last12Months}
          />
        </Suspense>
      </div>
      <div className="mt-6">
        <LatestInvoices
          latestInvoices={latestInvoices}
          title={dict.dashboard.latestInvoices}
          footerText={dict.dashboard.updatedJustNow}
        />
      </div>
    </main>
  );
}
