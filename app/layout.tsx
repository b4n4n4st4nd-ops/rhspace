import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { getSiteConfig } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ryanhambleton.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ryan Hambleton — Visualization Developer & Analytics Engineer",
    template: "%s | Ryan Hambleton",
  },
  description:
    "BI platforms, data pipelines, AI agents, and interactive experiences. Tableau, Alteryx, SQL, Python, Next.js.",
  openGraph: {
    siteName: "Ryan Hambleton",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteConfig();

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <SiteHeader site={site} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
