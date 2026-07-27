"use client";

import { Locale, dictionaries, locales, localizedPath, stripLocale } from "@/app/lib/i18n";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pathname: pathWithoutLocale } = stripLocale(pathname);
  const queryString = searchParams.toString();

  return (
    <div
      className="flex rounded-md bg-gray-50 p-1 text-xs font-medium"
      aria-label={dictionaries[locale].language.label}
    >
      {locales.map((targetLocale) => {
        const href = `${localizedPath(targetLocale, pathWithoutLocale)}${
          queryString ? `?${queryString}` : ""
        }`;

        return (
          <Link
            key={targetLocale}
            href={href}
            className={clsx("rounded px-2 py-1 transition-colors", {
              "bg-blue-600 text-white": targetLocale === locale,
              "text-gray-600 hover:bg-sky-100 hover:text-blue-600":
                targetLocale !== locale,
            })}
          >
            {dictionaries[locale].language[targetLocale]}
          </Link>
        );
      })}
    </div>
  );
}
