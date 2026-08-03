export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function stripLocale(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (!isLocale(maybeLocale)) {
    return {
      locale: defaultLocale,
      pathname,
    };
  }

  const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

  return {
    locale: maybeLocale,
    pathname:
      pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, ""),
  };
}

export function localizedPath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export const dictionaries = {
  ja: {
    metadata: {
      title: "Acme ダッシュボード",
      description:
        "App Router で作られた Next.js Course のダッシュボードです。",
      previewAlt: "Acme ダッシュボードのプレビュー画像",
    },
    home: {
      welcomeStrong: "Acme へようこそ。",
      welcomeText:
        "これは Vercel が提供する Next.js Learn Course のサンプルです。",
      courseLink: "Next.js Learn Course",
      login: "ログイン",
      heroDesktopAlt: "デスクトップ版のダッシュボード画面",
      heroMobileAlt: "モバイル版のダッシュボード画面",
    },
    nav: {
      appTitle: "財務管理ダッシュボード",
      home: "ホーム",
      invoices: "請求書",
      customers: "顧客",
      revenue: "収益",
      signOut: "ログアウト",
    },
    dashboard: {
      title: "ダッシュボード",
      collected: "回収済み",
      pending: "保留中",
      totalInvoices: "請求書数",
      totalCustomers: "顧客数",
      recentRevenue: "最近の売上",
      latestInvoices: "最新の請求書",
      last12Months: "直近12か月",
      updatedJustNow: "たった今更新",
      noData: "データがありません。",
    },
    invoices: {
      title: "請求書",
      searchPlaceholder: "請求書を検索...",
      create: "請求書を作成",
      edit: "請求書を編集",
      customer: "顧客",
      email: "メール",
      amount: "金額",
      date: "日付",
      status: "ステータス",
      chooseCustomer: "顧客を選択",
      selectCustomer: "顧客を選択してください",
      chooseAmount: "金額を入力",
      amountPlaceholder: "USD 金額を入力",
      setStatus: "請求書のステータスを設定",
      paid: "支払い済み",
      pending: "保留中",
      cancel: "キャンセル",
      delete: "削除",
      notFoundTitle: "404 見つかりません",
      notFoundText: "指定された請求書が見つかりませんでした。",
      goBack: "戻る",
    },
    customers: {
      title: "顧客",
      page: "顧客ページ",
    },
    revenue: {
      title: "収益",
      page: "収益ページ",
    },
    login: {
      title: "続けるにはログインしてください。",
      email: "メール",
      emailPlaceholder: "メールアドレスを入力",
      password: "パスワード",
      passwordPlaceholder: "パスワードを入力",
      submit: "ログイン",
      invalidCredentials: "認証情報が正しくありません。",
      genericError: "問題が発生しました。",
    },
    language: {
      label: "言語",
      ja: "日本語",
      en: "English",
    },
  },
  en: {
    metadata: {
      title: "Acme Dashboard",
      description:
        "The official Next.js Course Dashboard, built with App Router.",
      previewAlt: "Acme Dashboard preview image",
    },
    home: {
      welcomeStrong: "Welcome to Acme.",
      welcomeText:
        "This is the example for the Next.js Learn Course, brought to you by Vercel.",
      courseLink: "Next.js Learn Course",
      login: "Log in",
      heroDesktopAlt:
        "Screenshots of the dashboard project showing desktop version",
      heroMobileAlt:
        "Screenshots of the dashboard project showing mobile version",
    },
    nav: {
      appTitle: "Financial Management Dashboard",
      home: "Home",
      invoices: "Invoices",
      customers: "Customers",
      revenue: "Revenue",
      signOut: "Sign Out",
    },
    dashboard: {
      title: "Dashboard",
      collected: "Collected",
      pending: "Pending",
      totalInvoices: "Total Invoices",
      totalCustomers: "Total Customers",
      recentRevenue: "Recent Revenue",
      latestInvoices: "Latest Invoices",
      last12Months: "Last 12 months",
      updatedJustNow: "Updated just now",
      noData: "No data available.",
    },
    invoices: {
      title: "Invoices",
      searchPlaceholder: "Search invoices...",
      create: "Create Invoice",
      edit: "Edit Invoice",
      customer: "Customer",
      email: "Email",
      amount: "Amount",
      date: "Date",
      status: "Status",
      chooseCustomer: "Choose customer",
      selectCustomer: "Select a customer",
      chooseAmount: "Choose an amount",
      amountPlaceholder: "Enter USD amount",
      setStatus: "Set the invoice status",
      paid: "Paid",
      pending: "Pending",
      cancel: "Cancel",
      delete: "Delete",
      notFoundTitle: "404 Not Found",
      notFoundText: "Could not find the requested invoice.",
      goBack: "Go Back",
    },
    customers: {
      title: "Customers",
      page: "Customers Page",
    },
    revenue: {
      title: "Revenue",
      page: "Revenue Page",
    },
    login: {
      title: "Please log in to continue.",
      email: "Email",
      emailPlaceholder: "Enter your email address",
      password: "Password",
      passwordPlaceholder: "Enter password",
      submit: "Log in",
      invalidCredentials: "Invalid credentials.",
      genericError: "Something went wrong.",
    },
    language: {
      label: "Language",
      ja: "日本語",
      en: "English",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
