import { Suspense } from "react";
import type { BlogPost, BlogCategory, BlogBanner, BlogTag } from "@/types/blog";
import { HeroBlog } from "./HeroBlog";
import { GridBlog } from "./GridBlog";
import { BlogSearch } from "./BlogSearch";
import { PaginationPage } from "./PaginationPage";

interface BlogProps {
  posts: BlogPost[];
  latestPosts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  currentPage: number;
  totalPages: number;
  searchParams: string;
  banner?: BlogBanner | null;
}

export function Blog({
  posts,
  latestPosts,
  categories,
  tags,
  currentPage,
  totalPages,
  searchParams,
  banner,
}: BlogProps) {
  return (
    <div>
      {/* Hero carousel - only on page 1 without filters */}
      {currentPage === 1 && !searchParams && <HeroBlog posts={latestPosts} />}

      {/* Articles section */}
      <section className="mt-16 md:mt-20">
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-in-avantgarde text-center md:text-left">
            Artículos
          </h2>
          <Suspense fallback={null}>
            <BlogSearch categories={categories} tags={tags} />
          </Suspense>
        </div>

        <GridBlog posts={posts} banner={banner} />
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </section>
    </div>
  );
}
