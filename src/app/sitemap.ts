import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/business";
import { courses } from "@/data/courses";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/academia",
    ...courses.map((c) => `/academia/${c.slug}`),
    "/seminarios",
    "/salon",
    "/nosotros",
    "/contacto",
    "/privacidad",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/academia" ? 0.9 : 0.7,
  }));
}
