import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { defaultLocale, getDictionary, localizedPath } from "@/app/lib/i18n";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">{dict.invoices.notFoundTitle}</h2>
      <p>{dict.invoices.notFoundText}</p>
      <Link
        href={localizedPath(defaultLocale, "/dashboard/invoices")}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {dict.invoices.goBack}
      </Link>
    </main>
  );
}
