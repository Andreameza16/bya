import type { Metadata } from "next";
import { business, siteUrl } from "@/data/business";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${business.shortName}`,
      description,
      url: `${siteUrl}${path}`,
      type: "website",
      locale: "es_NI",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
