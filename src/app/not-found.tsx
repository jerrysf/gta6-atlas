import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex size-14 items-center justify-center rounded-full bg-surface-2">
        <Compass className="size-7 text-brand" />
      </div>
      <h1 className="mt-6 text-3xl font-black tracking-tight">
        404 — Lost in Leonida
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been
        charted yet. Try one of these instead:
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/guides">Browse Guides</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/map">Interactive Map</Link>
        </Button>
      </div>
    </div>
  );
}
