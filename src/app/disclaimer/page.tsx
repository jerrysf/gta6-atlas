import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer",
  description: "GTA6 Atlas independence and content disclaimer.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Disclaimer"
        breadcrumbs={[{ name: "Disclaimer", href: "/disclaimer" }]}
      />
      <div className="prose-guide">
        <h2>Fan-site disclaimer</h2>
        <p>{siteConfig.disclaimer}</p>
        <h2>Accuracy of information</h2>
        <p>
          We work hard to keep information accurate and label every entry with
          one of four verification statuses:
        </p>
        <ul>
          <li>
            <strong>Officially Confirmed</strong> — published by Rockstar Games
            in official materials.
          </li>
          <li>
            <strong>Gameplay Verified</strong> — confirmed through direct
            in-game testing by our team.
          </li>
          <li>
            <strong>Community Reported</strong> — reported by players but not
            yet independently verified.
          </li>
          <li>
            <strong>Unverified</strong> — placeholder or early-stage
            information awaiting confirmation.
          </li>
        </ul>
        <p>
          Content labelled community-reported or unverified may be inaccurate.
          Always check the verification badge on any entry.
        </p>
        <h2>Media</h2>
        <p>
          We do not redistribute copyrighted game assets. Visuals on this site
          are original UI artwork, appropriately licensed, or used under fair
          use for commentary and informational purposes.
        </p>
      </div>
    </div>
  );
}
