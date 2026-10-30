"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ADSENSE_ID, GA_ID, trackPageView } from "@/lib/analytics";

/**
 * Loads GA4 + AdSense only when configured via environment variables.
 * Without IDs set, this renders nothing and performs no tracking.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (GA_ID) trackPageView(pathname);
  }, [pathname]);

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {ADSENSE_ID && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
