import type { MetadataRoute } from "next";
const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
