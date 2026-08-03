"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Locale, getDictionary, localizedPath } from "@/app/lib/i18n";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { labelKey: "home", href: "/dashboard", icon: HomeIcon },
  {
    labelKey: "invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { labelKey: "customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { labelKey: "revenue", href: "/dashboard/revenue", icon: ChartBarIcon },
] as const;

export default function NavLinks({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const href = localizedPath(locale, link.href);
        return (
          <Link
            key={link.href}
            href={href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{dict.nav[link.labelKey]}</p>
          </Link>
        );
      })}
    </>
  );
}
