import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Revenue | Acme Dashboard",
};

export default function Page() {
  return (
    <main className="w-full">
      <h1 className={`${lusitana.className} mb-2 text-2xl`}>収益</h1>
      <p className="mb-6 text-sm text-gray-500">年間財務パフォーマンス</p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li className="rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-500">年間収益</p>
          <p className={`${lusitana.className} mt-2 text-2xl`}>$951,200</p>
          <p className="mt-2 text-xs text-green-700">前年比 +12%</p>
        </li>
        <li className="rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-500">年間経費</p>
          <p className={`${lusitana.className} mt-2 text-2xl`}>$343,700</p>
          <p className="mt-2 text-xs text-amber-700">前年比 +9.8%</p>
        </li>
        <li className="rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-500">純利益</p>
          <p className={`${lusitana.className} mt-2 text-2xl`}>$607,500</p>
          <p className="mt-2 text-xs text-green-700">前年比 +18.5%</p>
        </li>
      </ul>

      <div className="mt-6 rounded-md bg-gray-50 p-4">
        <p className="text-sm text-gray-500">月間収益</p>
        <p className={`${lusitana.className} mt-2 text-2xl`}>$79,300</p>
      </div>

      <dl className="mt-6 overflow-hidden rounded-md bg-gray-50 text-sm text-gray-700">
        <div className="grid grid-cols-3 border-b border-gray-200 px-4 py-3 font-medium text-gray-900">
          <dt>月</dt>
          <dt>経費</dt>
          <dt>利益</dt>
        </div>
        <div className="grid grid-cols-3 px-4 py-3">
          <dd>1月</dd>
          <dd>$24,100</dd>
          <dd>$39,500</dd>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-200 px-4 py-3">
          <dd>2月</dd>
          <dd>$26,700</dd>
          <dd>$41,200</dd>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-200 px-4 py-3">
          <dd>3月</dd>
          <dd>$28,300</dd>
          <dd>$43,800</dd>
        </div>
      </dl>
    </main>
  );
}
