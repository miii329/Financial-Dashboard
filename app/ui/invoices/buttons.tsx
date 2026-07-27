import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteInvoice } from "@/app/lib/actions";
import { Locale, localizedPath } from "@/app/lib/i18n";

export function CreateInvoice({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  return (
    <Link
      href={localizedPath(locale, "/dashboard/invoices/create")}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{label}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id, locale }: { id: string; locale: Locale }) {
  return (
    <Link
      href={localizedPath(locale, `/dashboard/invoices/${id}/edit`)}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({
  id,
  locale,
  label,
}: {
  id: string;
  locale: Locale;
  label: string;
}) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id, locale);
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">{label}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
