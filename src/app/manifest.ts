import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GTA6 Atlas — The Ultimate GTA 6 Guide & Database",
    short_name: "GTA6 Atlas",
    description:
      "Grand Theft Auto VI guides, interactive map, databases and completion tracking.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f14",
    theme_color: "#0b0f14",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
