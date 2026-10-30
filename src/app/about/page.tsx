import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About GTA6 Atlas",
  description:
    "About GTA6 Atlas — an independent fan-made guide website for Grand Theft Auto VI.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PageHeader
        title="About GTA6 Atlas"
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />
      <div className="prose-guide">
        <p>
          GTA6 Atlas is an independent fan-made guide website for Grand Theft
          Auto VI. Our goal is to build the most useful, most honest GTA 6
          resource on the web — an interactive map of Leonida, complete mission
          walkthroughs, a 100% completion tracker, and a database covering
          vehicles, weapons, characters, locations, collectibles and secrets.
        </p>
        <h2>Our accuracy promise</h2>
        <p>
          Every piece of information on this site carries a verification
          status: <strong>officially confirmed</strong>,{" "}
          <strong>gameplay verified</strong>, <strong>community reported</strong>, or{" "}
          <strong>unverified</strong>. We never publish invented missions,
          vehicles, weapons or locations, and we clearly separate confirmed
          information from community reports and speculation.
        </p>
        <h2>Independence</h2>
        <p>{siteConfig.disclaimer}</p>
        <h2>Contact</h2>
        <p>
          Found an error, or want to contribute a correction? Reach us through
          the <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
