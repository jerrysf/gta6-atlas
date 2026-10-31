"use client";

import dynamic from "next/dynamic";

const ExploreGame = dynamic(
  () => import("@/components/explore/explore-game").then((m) => m.ExploreGame),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100vh-4rem)] min-h-[540px] items-center justify-center bg-[#070d18]">
        <div className="text-center">
          <p className="font-display text-2xl tracking-wide text-brand">
            LEONIDA 3D EXPLORER
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Loading diorama…
          </p>
        </div>
      </div>
    ),
  }
);

export default function ExploreClient() {
  return <ExploreGame />;
}
