import type { Mission } from "@/lib/types";

// No GTA VI mission names or objectives have been officially revealed.
// Mission entries must only be created once verified after release.
// The schema supports the full walkthrough format (objectives, steps,
// rewards, related content) so verified entries can drop in without changes.
export const missions: Mission[] = [];

// ── Launch-day entry template ──────────────────────────────────────────────
// Copy the block below, fill it in from verified gameplay, then set
// verificationStatus to "gameplay_verified". Keep slugs kebab-case.
//
// {
//   slug: "mission-slug",
//   name: "Mission Name",
//   type: "main",                       // "main" | "side"
//   summary: "One-line spoiler-safe summary.",
//   verificationStatus: "gameplay_verified",
//   difficulty: "medium",               // easy | medium | hard
//   estimatedTime: "15 min",
//   objectives: ["Do X", "Do Y"],
//   steps: ["Step one detail…", "Step two detail…"],
//   rewards: ["$500", "Unlocks …"],
//   relatedMissions: ["other-slug"],
//   relatedLocations: ["location-slug"],
//   updatedAt: "2026-11-19",
//   sources: [{ label: "Verified in-game", url: "https://…" }],
// },
