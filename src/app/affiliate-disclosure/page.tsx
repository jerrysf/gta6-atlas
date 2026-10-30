import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Affiliate Disclosure",
  description: "How GTA6 Atlas uses affiliate links.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Affiliate Disclosure"
        breadcrumbs={[
          { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
        ]}
      />
      <div className="prose-guide">
        <p>
          <em>Last updated: October 31, 2026</em>
        </p>
        <p>
          Some pages on GTA6 Atlas may contain affiliate links — links to
          products or services at partner merchants. If you buy through one of
          these links, we may earn a commission at no extra cost to you.
        </p>
        <h2>How we label affiliate links</h2>
        <p>
          Every affiliate link on this site is clearly marked as such at the
          point of display, and links use the{" "}
          <code>rel=&quot;sponsored&quot;</code> attribute. We never disguise
          affiliate links as editorial recommendations.
        </p>
        <h2>Editorial independence</h2>
        <p>
          Affiliate relationships never influence our coverage, ratings or
          verification statuses. We only link to products we believe are
          relevant to readers, and we never invent affiliate relationships.
        </p>
        <h2>Questions</h2>
        <p>
          Questions about our affiliate practices? Reach us via the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
