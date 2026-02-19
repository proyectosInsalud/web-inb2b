import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { sanityClient } from "@/lib/sanity.client";
import {
  POSTS_PAGINATED,
  TOTAL_POSTS,
  LATEST_POSTS,
  ALL_CATEGORIES,
  ACTIVE_BANNER,
  ALL_TAGS,
} from "@/lib/queries";
import type { BlogPost, BlogCategory, BlogBanner, BlogTag } from "@/types/blog";
import { HeroNav } from "@/components/pages/home/HeroNav";
import { Blog } from "@/components/blog/Blog";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { ContactHomeTab } from "@/components/pages/home/ContactHomeTab";

const POSTS_PER_PAGE = 9;

export const revalidate = 300;

const getPosts = unstable_cache(
  (start: number, end: number, search: string, category: string, tag: string) =>
    sanityClient.fetch<BlogPost[]>(POSTS_PAGINATED, { start, end, search, category, tag }),
  ["posts-paginated"],
  { revalidate: 300 }
);

const getTotalPosts = unstable_cache(
  (search: string, category: string, tag: string) =>
    sanityClient.fetch<number>(TOTAL_POSTS, { search, category, tag }),
  ["posts-total"],
  { revalidate: 300 }
);

const getLatestPosts = unstable_cache(
  (limit: number) => sanityClient.fetch<BlogPost[]>(LATEST_POSTS, { limit }),
  ["posts-latest"],
  { revalidate: 300 }
);

const getCategories = unstable_cache(
  () => sanityClient.fetch<BlogCategory[]>(ALL_CATEGORIES),
  ["blog-categories"],
  { revalidate: 300 }
);

const getTags = unstable_cache(
  () => sanityClient.fetch<BlogTag[]>(ALL_TAGS),
  ["blog-tags"],
  { revalidate: 300 }
);

const getActiveBanner = unstable_cache(
  () => sanityClient.fetch<BlogBanner | null>(ACTIVE_BANNER),
  ["blog-banner"],
  { revalidate: 300 }
);

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, guías y novedades sobre el sector salud, transformación digital y emprendimiento en LATAM.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; search?: string; category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const search = params.search || "";
  const category = params.category || "";
  const tag = params.tag || "";
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const hasFilters = search || category || tag;

  const [posts, totalPosts, latestPosts, categories, tags, banner] = await Promise.all([
    getPosts(start, end, search, category, tag),
    getTotalPosts(search, category, tag),
    !hasFilters && currentPage === 1 ? getLatestPosts(3) : Promise.resolve([]),
    getCategories(),
    getTags(),
    getActiveBanner(),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Build searchParams string (without page) for pagination links
  const sp = new URLSearchParams();
  if (search) sp.set("search", search);
  if (category) sp.set("category", category);
  if (tag) sp.set("tag", tag);
  const searchParamsStr = sp.toString();

  return (
    <div className="bg-in-blue-main min-h-screen">
      {/* Nav */}
      <div className="pt-6">
        <HeroNav />
      </div>

      {/* Hero title */}
      <div className="container max-w-7xl mx-auto px-4 pt-8 md:pt-32 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white font-in-avantgarde mb-3">
          Centro de Salud: Estrategias, Gestión y Crecimiento
        </h1>
        <p className="text-white/50 font-in-poppins text-sm md:text-base max-w-2xl mx-auto">
          Descubre sobre la supervisión de Susulud, inscribirte en IPRESS y otros.
        </p>
      </div>

      {/* Blog content */}
      <div className="container max-w-7xl mx-auto px-4 pt-10 md:pt-14">
        <Blog
          posts={posts}
          latestPosts={latestPosts}
          categories={categories}
          tags={tags}
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParamsStr}
          banner={banner}
        />
      </div>

      {/* CTA */}
      <BlogCTA />

      {/* Contact form (reuse from home) */}
      <ContactHomeTab />
    </div>
  );
}
