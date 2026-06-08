import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "あわいの手帖",
    short_name: "あわいの手帖",
    description:
      "心理・神霊・自然・見えない現象を、論理と感性の両方で読み解くブログ",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0f",
    theme_color: "#6366f1",
    orientation: "portrait",
    categories: ["books", "lifestyle"],
    lang: "ja",
    icons: [
      { src: "/icons/icon-72x72.png",   sizes: "72x72",   type: "image/png" },
      { src: "/icons/icon-96x96.png",   sizes: "96x96",   type: "image/png" },
      { src: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { src: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        // @ts-expect-error purpose is valid per spec
        purpose: "any maskable",
      },
    ],
  };
}
