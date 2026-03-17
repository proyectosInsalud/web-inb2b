import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { POST_BY_SLUG } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.client";
import type { BlogPostDetail } from "@/types/blog";
import { HeroNav } from "@/components/pages/home/HeroNav";
import { EntradaBlog } from "@/components/blog/EntradaBlog";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { ContactHomeTab } from "@/components/pages/home/ContactHomeTab";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

const getPostBySlug = unstable_cache(
  (slug: string) => sanityClient.fetch<BlogPostDetail | null>(POST_BY_SLUG, { slug }),
  ["post-by-slug"],
  { revalidate: 300 }
);

const getAllSlugs = unstable_cache(
  () =>
    sanityClient.fetch<string[]>(
      '*[_type == "post" && defined(slug.current)][].slug.current'
    ),
  ["post-slugs"],
  { revalidate: 300 }
);

export const revalidate = 300;

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post no encontrado" };


  if (!post) return { title: "Post no encontrado" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const imageUrl = post.cover?.asset
    ? urlFor(post.cover.asset).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function BlogSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="bg-in-blue-main min-h-screen">
      {/* Nav */}
      <div className="pt-6">
        <HeroNav />
      </div>

      {/* Post content */}
      <div className="container max-w-7xl mx-auto px-4 pt-8 md:pt-32 pb-16">
        <EntradaBlog post={post} />
      </div>

      {/* CTA */}
      <BlogCTA />

      {/* Contact form */}
      <ContactHomeTab />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}
