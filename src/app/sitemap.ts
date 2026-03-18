import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://inb2blatam.com";

  // Fetch all post slugs and modification dates
  const posts = await sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
    '*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }'
  );

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
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

