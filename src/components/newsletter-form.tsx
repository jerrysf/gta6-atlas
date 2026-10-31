"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

/**
 * Newsletter capture — only renders when NEXT_PUBLIC_NEWSLETTER_URL is
 * configured (e.g. a Buttondown/ConvertKit form endpoint). Posts the email
 * to that endpoint; stays hidden otherwise so no dead form ships.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  if (!ENDPOINT) return null;

  return (
    <form
      className="flex gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await fetch(ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}`,
          });
          setState("done");
        } catch {
          setState("error");
        }
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for launch alerts"
          className="h-8 w-full rounded-md border border-border bg-surface-2/50 pl-8 pr-2 text-xs outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/60"
        />
      </div>
      <button
        type="submit"
        className="h-8 shrink-0 rounded-md bg-brand px-3 text-xs font-semibold text-black transition-colors hover:bg-brand/90"
      >
        {state === "done" ? "Subscribed" : state === "error" ? "Retry" : "Join"}
      </button>
    </form>
  );
}
