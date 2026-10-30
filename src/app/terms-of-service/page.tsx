import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms of Service for using GTA6 Atlas.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Terms of Service"
        breadcrumbs={[{ name: "Terms of Service", href: "/terms-of-service" }]}
      />
      <div className="prose-guide">
        <p>
          <em>Last updated: October 31, 2026</em>
        </p>
        <p>
          By accessing {siteConfig.name}, you agree to these Terms of Service.
        </p>
        <h2>Content</h2>
        <p>
          Guides, database entries and tools on this site are provided for
          informational purposes. We label every piece of content with a
          verification status; content marked community-reported or unverified
          may contain inaccuracies and should be treated accordingly.
        </p>
        <h2>Intellectual property</h2>
        <p>{siteConfig.disclaimer}</p>
        <p>
          Original text, design and code on this site belong to{" "}
          {siteConfig.name}. Grand Theft Auto, Rockstar Games and related marks
          are trademarks of their respective owners and are referenced under
          nominative fair use for informational purposes only.
        </p>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Scrape or bulk-republish site content without permission.</li>
          <li>Interfere with the site&apos;s operation or security.</li>
          <li>Misrepresent this site&apos;s affiliation with Rockstar Games.</li>
        </ul>
        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided &quot;as is&quot; without warranties of any kind.
          We do not guarantee that guide content is error-free or that the site
          will be uninterrupted.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {siteConfig.name} is not
          liable for indirect or consequential damages arising from use of the
          site.
        </p>
      </div>
    </div>
  );
}
