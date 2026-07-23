import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Acme Dashboard",
    template: "%s | Acme Dashboard",
  },
  description: "Acme Dashboard built with Next.js App Router.",
  openGraph: {
    title: "Acme Dashboard",
    description: "Acme Dashboard built with Next.js App Router.",
    type: "website",
    images: [
      {
        url: "/ogp-image.png",
        width: 1200,
        height: 630,
        alt: "Acme Dashboard preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acme Dashboard",
    description: "Acme Dashboard built with Next.js App Router.",
    images: ["/ogp-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
