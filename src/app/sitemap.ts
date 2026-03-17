import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://inb2blatam.com";

  // Fetch all post slugs
  const postsSlugs = await sanityClient.fetch<string[]>(
    '*[_type == "post" && defined(slug.current)].slug.current'
  );

  const postUrls: MetadataRoute.Sitemap = postsSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postUrls,
  ];
}

