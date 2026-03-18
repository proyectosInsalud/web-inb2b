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
  ["post-by-slug-v2"],
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

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post no encontrado" };

  const rawTitle = post.seo?.metaTitle || post.title;
  const title = rawTitle.length > 60 ? rawTitle.substring(0, 57) + "..." : rawTitle;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const imageUrl = post.cover?.asset
    ? urlFor(post.cover.asset).width(1200).height(630).url()
    : undefined;

  return {
    title: {
      absolute: title,
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover?.asset ? urlFor(post.cover.asset).url() : undefined,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "INB2B Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "INB2B Health Partners",
      "logo": {
        "@type": "ImageObject",
        "url": "https://inb2blatam.com/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://inb2blatam.com/blog/${slug}`
    }
  };

  return (
    <div className="bg-in-blue-main min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
