import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost, BlogBanner } from "@/types/blog";
import { urlFor } from "@/lib/sanity.client";
import { formatFechaPeru } from "@/helpers/formatFechaPeru";

const BANNER_POSITION = 3;

interface GridBlogProps {
  posts: BlogPost[];
  banner?: BlogBanner | null;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="block group">
      <article className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 h-full flex flex-col hover:border-in-cyan/30 transition-colors">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.cover?.asset ? (
            <Image
              src={urlFor(post.cover.asset)
                .width(600)
                .height(375)
                .quality(70)
                .auto("format")
                .url()}
              alt={post.cover.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              {...(post.cover.asset.metadata?.lqip
                ? { placeholder: "blur", blurDataURL: post.cover.asset.metadata.lqip }
                : {})}
            />
          ) : (
            <div className="w-full h-full bg-in-blue-dark flex items-center justify-center text-white/20">
              Sin imagen
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          {post.category && (
            <span className="text-in-cyan text-xs font-semibold font-in-poppins">
              {post.category.title}
            </span>
          )}

          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug.current}
                  className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-full bg-in-blue-dark text-in-cyan border border-in-cyan/25"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          ) : null}

          <h3 className="text-white font-bold font-in-avantgarde text-base md:text-lg leading-snug mb-2 line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-white/50 text-sm font-in-poppins line-clamp-3 flex-1 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              {post.author?.image?.asset ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image.asset).width(48).height(48).url()}
                    alt={post.author.name || "Autor"}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-in-cyan/30 flex items-center justify-center text-[10px] text-white font-bold">
                  {post.author?.name?.charAt(0) || "A"}
                </div>
              )}
              <span className="text-white/60 text-xs font-in-poppins">
                {post.author?.name || "INB2B"}
              </span>
            </div>
            <time className="text-white/40 text-xs font-in-poppins">
              {formatFechaPeru(post.publishedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BannerCard({ banner }: { banner: BlogBanner }) {
  if (!banner?.imageUrl) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 h-full min-h-0">
      <div className="relative h-full w-full min-h-[300px] md:min-h-0">
        <Image
          src={banner.imageUrl}
          alt={banner.alt || "Banner publicitario"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export function GridBlog({ posts, banner }: GridBlogProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50 text-lg font-in-poppins">
          No hay artículos publicados aún.
        </p>
      </div>
    );
  }

  const items: React.ReactNode[] = posts.map((post) => (
    <BlogCard key={post._id} post={post} />
  ));

  // Insert banner at index 3 (4th position)
  if (banner && posts.length >= 1) {
    const insertIndex = Math.min(posts.length, BANNER_POSITION);
    items.splice(insertIndex, 0, <BannerCard key="banner-publicitario" banner={banner} />);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items}
    </div>
  );
}