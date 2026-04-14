import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { sanityClient } from "@/lib/sanity.client";
import {
  BLOG_PAGE_DATA,
} from "@/lib/queries";
import type { BlogPost, BlogCategory, BlogBanner, BlogTag } from "@/types/blog";
import { HeroNav } from "@/components/pages/home/HeroNav";
import { Blog } from "@/components/blog/Blog";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { ContactHomeTab } from "@/components/pages/home/ContactHomeTab";

const POSTS_PER_PAGE = 8;

export const revalidate = 60; // Reducido a 1 minuto para actualizaciones más rápidas en producción

interface BlogData {
  posts: BlogPost[];
  total: number;
  latest: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  banner: BlogBanner | null;
}

const truncateTitle = (text: string, limit = 60) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit - 3) + "..." : text;
};

async function getBlogData(start: number, end: number, search: string, category: string, tag: string) {
  return sanityClient.fetch<BlogData>(BLOG_PAGE_DATA, {
    start,
    end,
    search,
    category,
    tag,
  } as Record<string, unknown>, {
    next: { 
      revalidate: 60,
      tags: ["blog-list"] 
    }
  });
}
// Note: Arguments are automatically used by Next.js if they are serializable, 
// but we add a version suffix to the tags/keys if needed.

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const isRoot = !params.page || params.page === "1";
  const hasFilters = Boolean(params.search || params.category || params.tag);
  // Aseguramos que solo se indexe la raíz sin filtros para evitar duplicidad
  const shouldIndex = isRoot && !hasFilters;

  const metaTitle = truncateTitle("Blog de Salud Digital y Gestión Clínica en LATAM | INB2B");
  
  return {
    title: {
      absolute: metaTitle,
    },
    description:
      "Centro de Salud Digital y Gestión Clínica en LATAM. Guías prácticas de expertos para escalar tu negocio de salud. ¡Entra ahora y optimiza tu gestión clínica! →",
    alternates: {
      canonical: "/blog",
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title: "Blog de Salud Digital y Gestión Clínica en LATAM | INB2B",
      description:
        "Descubre guías prácticas sobre gestión clínica, salud digital y emprendimiento médico en LATAM. Contenido real de expertos del sector.",
      url: "https://inb2blatam.com/blog",
      type: "website",
    },
  };
}

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

  const data = await getBlogData(start, end, search, category, tag).catch((err) => {
    console.error("Error fetching blog data:", err);
    return null;
  });

  if (!data) {
    return (
      <div className="bg-in-blue-main min-h-screen pt-32 text-center text-white">
        <h1>Error al cargar el blog</h1>
        <p>Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  const { 
    posts = [], 
    total: totalPosts = 0, 
    latest: latestPosts = [], 
    categories = [], 
    tags = [], 
    banner = null 
  } = data;

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
