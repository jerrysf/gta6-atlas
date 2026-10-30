import type { CompletionData } from "@/lib/types";

// SAMPLE DATA ONLY — clearly flagged via `isSampleData`.
// These categories demonstrate the tracker structure. The real GTA VI
// completion checklist does not exist yet; replace this file with verified
// requirements after release. Each item count is intentionally small and
// generic so it can never be mistaken for real game data.
export const completionData: CompletionData = {
  isSampleData: true,
  categories: [
    {
      id: "main-story",
      title: "Main Story Missions",
      description: "Story missions required for completion.",
      items: [
        { id: "story-1", label: "Sample story mission 1", detail: "Demo entry — replaced at launch" },
        { id: "story-2", label: "Sample story mission 2", detail: "Demo entry — replaced at launch" },
        { id: "story-3", label: "Sample story mission 3", detail: "Demo entry — replaced at launch" },
      ],
    },
    {
      id: "side-missions",
      title: "Side Missions",
      description: "Optional missions and strangers content.",
      items: [
        { id: "side-1", label: "Sample side activity 1", detail: "Demo entry — replaced at launch" },
        { id: "side-2", label: "Sample side activity 2", detail: "Demo entry — replaced at launch" },
      ],
    },
    {
      id: "collectibles",
      title: "Collectibles",
      description: "Hidden pickups and collectible sets.",
      items: [
        { id: "col-1", label: "Sample collectible set 1", detail: "Demo entry — replaced at launch" },
        { id: "col-2", label: "Sample collectible set 2", detail: "Demo entry — replaced at launch" },
        { id: "col-3", label: "Sample collectible set 3", detail: "Demo entry — replaced at launch" },
      ],
    },
    {
      id: "activities",
      title: "Activities",
      description: "Pastimes, hobbies, and challenges.",
      items: [
        { id: "act-1", label: "Sample activity 1", detail: "Demo entry — replaced at launch" },
        { id: "act-2", label: "Sample activity 2", detail: "Demo entry — replaced at launch" },
      ],
    },
    {
      id: "locations",
      title: "Locations",
      description: "Areas and properties to discover or own.",
      items: [
        { id: "loc-1", label: "Sample location requirement 1", detail: "Demo entry — replaced at launch" },
        { id: "loc-2", label: "Sample location requirement 2", detail: "Demo entry — replaced at launch" },
      ],
    },
    {
      id: "misc",
      title: "Other Requirements",
      description: "Miscellaneous tasks required for 100%.",
      items: [
        { id: "misc-1", label: "Sample requirement 1", detail: "Demo entry — replaced at launch" },
        { id: "misc-2", label: "Sample requirement 2", detail: "Demo entry — replaced at launch" },
      ],
    },
  ],
};
