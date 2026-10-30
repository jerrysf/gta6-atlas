import type { Metadata } from "next";
import Link from "next/link";
import { ListChecks, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { WalkthroughNav } from "@/components/walkthrough-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { missionRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Walkthroughs — Main & Side Mission Guides",
  description:
    "Step-by-step GTA 6 walkthroughs for every main and side mission — objectives, rewards and strategies, verified in-game after launch.",
  path: "/walkthrough",
});

export default async function WalkthroughPage() {
  const missions = await missionRepo.getAll();
  const main = missions.filter((m) => m.type === "main");
  const side = missions.filter((m) => m.type === "side");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="GTA 6 Walkthroughs"
        description="Complete mission guides for Grand Theft Auto VI — objectives, step-by-step instructions, rewards and related content."
        breadcrumbs={[{ name: "Walkthroughs", href: "/walkthrough" }]}
      />
      <WalkthroughNav active="/walkthrough" />

      <PendingBanner title="Walkthroughs unlock at launch">
        GTA VI releases November 19, 2026 — and no mission names or objectives
        have been officially revealed. Every walkthrough published here will be
        written from verified gameplay, never invented. Below is exactly what
        this section will deliver.
      </PendingBanner>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/walkthrough/main-missions" className="group">
          <Card className="h-full transition-colors group-hover:border-brand/40">
            <CardHeader>
              <span className="flex size-10 items-center justify-center rounded-lg bg-surface-2 text-brand">
                <ScrollText className="size-5" />
              </span>
              <CardTitle className="mt-2 group-hover:text-brand">
                Main Story Missions
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {main.length} published
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Every story mission guide with objectives, difficulty ratings,
              step-by-step instructions and rewards — published as we verify
              each mission in-game.
            </CardContent>
          </Card>
        </Link>
        <Link href="/walkthrough/side-missions" className="group">
          <Card className="h-full transition-colors group-hover:border-brand-cyan/40">
            <CardHeader>
              <span className="flex size-10 items-center justify-center rounded-lg bg-surface-2 text-brand-cyan">
                <ListChecks className="size-5" />
              </span>
              <CardTitle className="mt-2 group-hover:text-brand-cyan">
                Side Missions
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {side.length} published
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Optional missions, stranger encounters and activities — each with
              unlock requirements, walkthroughs and reward breakdowns.
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">
            What every walkthrough will include
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>· Mission objectives checklist</li>
            <li>· Step-by-step instructions</li>
            <li>· Difficulty &amp; estimated completion time</li>
            <li>· Rewards breakdown</li>
            <li>· Related missions &amp; locations</li>
            <li>· Mission-specific FAQs</li>
            <li>· Verification status on every guide</li>
            <li>· Last-updated dates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
