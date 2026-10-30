import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { EmptyState } from "@/components/empty-state";
import { WalkthroughNav } from "@/components/walkthrough-nav";
import { MissionList } from "@/components/mission-list";
import { missionRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Main Story Missions — Complete Walkthrough List",
  description:
    "Every GTA 6 main story mission with step-by-step walkthroughs, objectives and rewards — verified in-game after release.",
  path: "/walkthrough/main-missions",
});

export default async function MainMissionsPage() {
  const missions = (await missionRepo.getAll()).filter(
    (m) => m.type === "main",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Main Story Missions"
        description="Every main story mission in Grand Theft Auto VI, in story order."
        breadcrumbs={[
          { name: "Walkthroughs", href: "/walkthrough" },
          { name: "Main Missions", href: "/walkthrough/main-missions" },
        ]}
      />
      <WalkthroughNav active="/walkthrough/main-missions" />
      <PendingBanner>
        Rockstar hasn&apos;t revealed any mission names yet. This list fills in
        the moment missions are verified in-game — check back after the
        November 19, 2026 launch.
      </PendingBanner>
      {missions.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="No missions published yet"
          description="Main story walkthroughs will be published here as each mission is verified in-game."
        />
      ) : (
        <MissionList missions={missions} />
      )}
    </div>
  );
}
