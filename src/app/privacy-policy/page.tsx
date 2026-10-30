import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "How GTA6 Atlas handles your data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
      />
      <div className="prose-guide">
        <p>
          <em>Last updated: October 31, 2026</em>
        </p>
        <p>
          This Privacy Policy explains what information {siteConfig.name}
          collects when you use this website and how that information is used.
        </p>
        <h2>Information we collect</h2>
        <h3>Local storage</h3>
        <p>
          The 100% Completion Tracker stores your checklist progress in your
          browser&apos;s localStorage. This data never leaves your device and is
          never transmitted to our servers. You can clear it at any time through
          your browser settings or the tracker&apos;s reset function.
        </p>
        <h3>Analytics</h3>
        <p>
          If analytics are enabled on this deployment, we may use Google
          Analytics 4 to collect anonymized usage statistics (pages visited,
          feature interactions). IP anonymization is enabled. Analytics only
          loads when configured; the site works fully without it.
        </p>
        <h3>Cookies</h3>
        <p>
          We do not set first-party cookies for tracking. Third-party services
          (analytics or advertising providers, when enabled) may set their own
          cookies subject to their own policies.
        </p>
        <h2>Advertising</h2>
        <p>
          This site may display advertising through Google AdSense in the
          future. When enabled, Google may use cookies to serve ads based on
          your prior visits. You can opt out of personalized advertising via
          Google&apos;s Ads Settings.
        </p>
        <h2>Your rights</h2>
        <p>
          Depending on your jurisdiction (including GDPR/UK GDPR and CCPA), you
          may have rights to access, correct, or delete personal data, and to
          opt out of sale or sharing of personal information. Since we do not
          collect personal accounts or store tracker data on servers, most
          requests can be satisfied by clearing your browser storage. Contact us
          via the <a href="/contact">contact page</a> for any privacy request.
        </p>
        <h2>Changes</h2>
        <p>
          We may update this policy as the site evolves. Material changes will
          be noted on this page with an updated date.
        </p>
      </div>
    </div>
  );
}
