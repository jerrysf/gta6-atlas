export const siteConfig = {
  name: "GTA6 Atlas",
  tagline: "The Ultimate GTA 6 Guide, Interactive Map & Game Database",
  description:
    "Your ultimate guide to Grand Theft Auto VI — explore Leonida, discover hidden secrets, master every mission, and track your journey to 100% completion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Home", href: "/" },
    { label: "Interactive Map", href: "/map" },
    { label: "Walkthroughs", href: "/walkthrough" },
    { label: "Vehicles", href: "/vehicles" },
    { label: "Weapons", href: "/weapons" },
    { label: "Characters", href: "/characters" },
    { label: "Collectibles", href: "/collectibles" },
    { label: "Guides", href: "/guides" },
  ],
  footerNav: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  socials: [
    { label: "X / Twitter", href: "https://x.com", key: "x" },
    { label: "YouTube", href: "https://youtube.com", key: "youtube" },
    { label: "Discord", href: "https://discord.com", key: "discord" },
    { label: "Reddit", href: "https://reddit.com", key: "reddit" },
  ],
  disclaimer:
    "GTA6 Atlas is an independent fan-made guide website. It is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. Grand Theft Auto and related trademarks belong to their respective owners.",
} as const;

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
