import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function createMetadata(input: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path ?? "/");
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    author: { "@type": "Person", name: input.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function videoGameJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Grand Theft Auto VI",
    alternateName: "GTA 6",
    url: "https://www.rockstargames.com/VI",
    gamePlatform: ["PlayStation 5", "Xbox Series X", "Xbox Series S"],
    publisher: { "@type": "Organization", name: "Rockstar Games" },
    author: { "@type": "Organization", name: "Rockstar Games" },
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
