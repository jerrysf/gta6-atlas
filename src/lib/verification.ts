import type { VerificationStatus } from "@/lib/types";

export const VERIFICATION_META: Record<
  VerificationStatus,
  { label: string; className: string; description: string }
> = {
  officially_confirmed: {
    label: "Officially Confirmed",
    className: "border-brand/50 text-brand",
    description: "Confirmed by Rockstar Games official materials.",
  },
  gameplay_verified: {
    label: "Gameplay Verified",
    className: "border-brand-cyan/50 text-brand-cyan",
    description: "Verified through in-game testing.",
  },
  community_reported: {
    label: "Community Reported",
    className: "border-amber-400/50 text-amber-300",
    description: "Reported by the community; not yet independently verified.",
  },
  unverified: {
    label: "Unverified",
    className: "border-muted-foreground/50 text-muted-foreground",
    description: "Awaiting verification. Treat with caution.",
  },
};
