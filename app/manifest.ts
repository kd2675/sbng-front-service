import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "수북농업",
    short_name: "수북농업",
    description:
      "수북농업은 흙손, 흙보약, 무등산 등 토양 중심 비료 솔루션과 농업 컨설팅을 제공합니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#a42d2d",
    theme_color: "#a42d2d",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
