import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CompletionTracker } from "@/components/completion/tracker";
import { completionData } from "@/data/completion";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "GTA 6 100% Completion Tracker",
  description:
    "Track your road to 100% completion in GTA 6 — missions, collectibles, activities and more. Progress saves locally; export and import your checklist as JSON.",
  path: "/completion",
});

export default function CompletionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="100% Completion Tracker"
        description="Check off every requirement on your road to 100% in Grand Theft Auto VI. Progress is saved in your browser and can be exported as JSON."
        breadcrumbs={[{ name: "Completion Tracker", href: "/completion" }]}
      />
      <CompletionTracker data={completionData} />
    </div>
  );
}
