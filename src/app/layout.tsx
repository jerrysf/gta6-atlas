import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackToTop } from "@/components/back-to-top";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Analytics } from "@/components/analytics";
import JsonLd from "@/components/json-ld";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "62EMnCnGeg0513YYSKuTH85CH-kiT8z2AEKBT0--iyE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        <TooltipProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
