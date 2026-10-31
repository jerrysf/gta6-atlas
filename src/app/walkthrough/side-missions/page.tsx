import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PendingBanner } from "@/components/pending-banner";
import { LockedMissions } from "@/components/locked-missions";
import { WalkthroughNav } from "@/components/walkthrough-nav";
import { MissionList } from "@/components/mission-list";
import { missionRepo } from "@/lib/repository";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 Side Missions — Optional Mission Walkthroughs",
  description:
    "Every GTA 6 side mission and optional activity with walkthroughs, unlock requirements and rewards — verified in-game after release.",
  path: "/walkthrough/side-missions",
});

export default async function SideMissionsPage() {
  const missions = (await missionRepo.getAll()).filter(
    (m) => m.type === "side",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Side Missions"
        description="Optional missions, stranger encounters and activities across Leonida."
        breadcrumbs={[
          { name: "Walkthroughs", href: "/walkthrough" },
          { name: "Side Missions", href: "/walkthrough/side-missions" },
        ]}
      />
      <WalkthroughNav active="/walkthrough/side-missions" />
      <PendingBanner>
        Side content is discovered through gameplay. Every side mission
        walkthrough will appear here once verified after launch.
      </PendingBanner>
      {missions.length === 0 ? (
        <LockedMissions />
      ) : (
        <MissionList missions={missions} />
      )}
    </div>
  );
}
