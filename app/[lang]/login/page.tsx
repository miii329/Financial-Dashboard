import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { getDictionary, getLocale } from "@/app/lib/i18n";
import { Suspense } from "react";

export default async function LoginPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="text-white md:w-36 font-bold">
            {/* <AcmeLogo /> */}財務情報管理ダッシュボード
          </div>
        </div>
        <Suspense>
          <LoginForm locale={locale} labels={dict.login} />
        </Suspense>
      </div>
    </main>
  );
}
