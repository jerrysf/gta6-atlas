"use client";

/**
 * Lightweight analytics facade. All IDs come from environment variables —
 * nothing loads until NEXT_PUBLIC_GA_ID is configured. Events are queued
 * onto window.gtag/dataLayer only when GA is present, so calling sites are
 * safe no-ops without configuration.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const isAnalyticsEnabled = Boolean(GA_ID);

export function trackEvent(
  eventName:
    | "page_view"
    | "search"
    | "map_interaction"
    | "tracker_update"
    | "guide_navigation"
    | string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined" || !isAnalyticsEnabled) return;
  window.gtag?.("event", eventName, params);
}

export function trackPageView(path: string, title?: string) {
  trackEvent("page_view", { page_path: path, page_title: title });
}
