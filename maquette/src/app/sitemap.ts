import type { MetadataRoute } from "next";
import { properties } from "@/content/properties";
import { siteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/biens", "/contact", "/confidentialite", "/maquette"].map((p) => ({ url: `${siteUrl}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...properties.map((p) => ({ url: `${siteUrl}/biens/${p.slug}`, priority: 0.8 })),
  ];
}
