import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "あわいの手帖",
    template: "%s | あわいの手帖",
  },
  description:
    "心理・神霊・自然・見えない現象を、論理と感性の両方で読み解くブログ",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "あわいの手帖",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
