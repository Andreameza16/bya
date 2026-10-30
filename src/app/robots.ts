import type { MetadataRoute } from "next";
import { canIndex, siteUrl } from "@/data/business";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: canIndex ? "/" : [],
      disallow: canIndex ? ["/admin/"] : ["/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
