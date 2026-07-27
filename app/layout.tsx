import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Acme ダッシュボード",
    template: "%s | Acme ダッシュボード",
  },
  description: "App Router で作られた Next.js Course のダッシュボードです。",
  openGraph: {
    title: "Acme ダッシュボード",
    description: "App Router で作られた Next.js Course のダッシュボードです。",
    type: "website",
    images: [
      {
        url: "/ogp-image.png",
        width: 1200,
        height: 630,
        alt: "Acme ダッシュボードのプレビュー画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acme ダッシュボード",
    description: "App Router で作られた Next.js Course のダッシュボードです。",
    images: ["/ogp-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
