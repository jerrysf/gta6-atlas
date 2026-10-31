"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Download,
  RotateCcw,
  Share2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trackEvent } from "@/lib/analytics";
import type { CompletionData } from "@/lib/types";

const STORAGE_KEY = "gta6-atlas:completion:v1";

interface PersistedState {
  dataVersion?: string;
  checked: string[];
}

export function CompletionTracker({ data }: { data: CompletionData }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [copiedShare, setCopiedShare] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const allIds = useMemo(
    () => data.categories.flatMap((c) => c.items.map((i) => i.id)),
    [data],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as PersistedState;
          const valid = new Set(
            (parsed.checked ?? []).filter((x) => allIds.includes(x)),
          );
          setChecked(valid);
        }
      } catch {
        // corrupted state — start fresh
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, [allIds]);

  const persist = useCallback((next: Set<string>) => {
    setChecked(next);
    try {
      const payload: PersistedState = { checked: [...next] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage unavailable — keep in-memory state
    }
  }, []);

  const toggle = (id: string, value: boolean) => {
    const next = new Set(checked);
    if (value) next.add(id);
    else next.delete(id);
    persist(next);
    trackEvent("tracker_update", { item: id, checked: value });
  };

  const total = allIds.length;
  const done = checked.size;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const exportProgress = () => {
    const payload = {
      app: "gta6-atlas",
      exportedAt: new Date().toISOString(),
      isSampleData: data.isSampleData,
      checked: [...checked],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gta6-atlas-completion.json";
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("tracker_update", { type: "export" });
  };

  const importProgress = (file: File) => {
    setImportError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          checked?: unknown;
        };
        if (!Array.isArray(parsed.checked)) throw new Error("bad shape");
        const valid = (parsed.checked as unknown[])
          .filter((x): x is string => typeof x === "string")
          .filter((id) => allIds.includes(id));
        persist(new Set(valid));
        trackEvent("tracker_update", { type: "import" });
      } catch {
        setImportError(
          "Could not import that file. Make sure it is a GTA6 Atlas completion export (JSON).",
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {data.isSampleData && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-300" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              Demo checklist — not real GTA 6 data
            </p>
            <p className="mt-1 text-muted-foreground">
              GTA VI&apos;s actual 100% requirements aren&apos;t known yet. This
              sample list lets you try the tracker today; it will be replaced
              with the verified checklist after release. Your progress is saved
              in this browser only.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportProgress}
                disabled={!hydrated}
              >
                <Download className="size-4" /> Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                disabled={!hydrated}
              >
                <Upload className="size-4" /> Import
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                aria-label="Import completion progress JSON"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importProgress(f);
                  e.target.value = "";
                }}
              />
              <Button
                variant="outline"
                size="sm"
                disabled={!hydrated || done === 0}
                onClick={() => {
                  const url = `${window.location.origin}/completion`;
                  const text = `I'm ${percent}% through my GTA 6 launch checklist on GTA6 Atlas (${done}/${total} items) — ${url}`;
                  navigator.clipboard.writeText(text).then(() => {
                    setCopiedShare(true);
                    setTimeout(() => setCopiedShare(false), 2000);
                  });
                  trackEvent("share_progress", { percent });
                }}
              >
                {copiedShare ? (
                  <>
                    <Check className="size-4" /> Copied
                  </>
                ) : (
                  <>
                    <Share2 className="size-4" /> Share
                  </>
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!hydrated || done === 0}>
                    <RotateCcw className="size-4" /> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This clears every checked item in your tracker. This
                      cannot be undone — export your progress first if you want
                      a backup.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => persist(new Set())}>
                      Reset progress
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground" aria-live="polite">
              {done} of {total} complete
            </span>
            <span className="font-bold text-brand">{percent}%</span>
          </div>
          <Progress
            value={percent}
            aria-label={`Overall completion: ${percent} percent`}
          />
          {importError && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {importError}
            </p>
          )}
          {percent === 100 && total > 0 && (
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand">
              <CheckCircle2 className="size-4" /> 100% complete — nice work.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {data.categories.map((category) => {
          const catDone = category.items.filter((i) =>
            checked.has(i.id),
          ).length;
          const catTotal = category.items.length;
          const catPercent =
            catTotal === 0 ? 0 : Math.round((catDone / catTotal) * 100);
          return (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {catDone}/{catTotal}
                  </Badge>
                </div>
                {category.description && (
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Progress
                  value={catPercent}
                  className="mb-4 h-1.5"
                  aria-label={`${category.title} progress: ${catPercent} percent`}
                />
                <ul className="space-y-2.5">
                  {category.items.map((item) => {
                    const id = `item-${item.id}`;
                    return (
                      <li key={item.id} className="flex items-start gap-3">
                        <Checkbox
                          id={id}
                          checked={checked.has(item.id)}
                          onCheckedChange={(v) =>
                            toggle(item.id, v === true)
                          }
                          aria-label={item.label}
                        />
                        <label htmlFor={id} className="cursor-pointer">
                          <span
                            className={
                              checked.has(item.id)
                                ? "text-sm text-muted-foreground line-through"
                                : "text-sm"
                            }
                          >
                            {item.label}
                          </span>
                          {item.detail && (
                            <span className="block text-xs text-muted-foreground">
                              {item.detail}
                            </span>
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
