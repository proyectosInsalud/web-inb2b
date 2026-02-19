"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { urlFor } from "@/lib/sanity.client";
import { formatFechaCompleta } from "@/helpers/formatFechaPeru";
import { Share2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface HeroBlogProps {
  posts: BlogPost[];
}

export function HeroBlog({ posts }: HeroBlogProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (posts.length === 0) return null;

  return (
    <section className="mb-12">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {posts.map((post) => (
            <div key={post._id} className="flex-[0_0_100%] min-w-0">
              <Link href={`/blog/${post.slug.current}`} className="block group">
                <div className="rounded-[24px] md:rounded-[28px] overflow-hidden border border-white/5 bg-[#022437] p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">

                    {/* LEFT PANEL */}
                    <div className="rounded-[20px] md:rounded-[24px] bg-gradient-to-br from-white/40 via-white/15 to-white/5 p-6 md:p-8 flex flex-col justify-between min-h-[260px] md:flex-1">

                      {/* Category + Tags */}
                      <div className="flex flex-col gap-4 w-full">
                        {post.category && (
                          <span className="w-fit bg-in-cyan/15 text-in-cyan border border-in-cyan/40 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                            {post.category.title}
                          </span>
                        )}
                        {post.tags?.length ? (
                          <div className="flex flex-wrap gap-1.5 w-full justify-start">
                            {post.tags.map((tag) => (
                              <span
                                key={tag.slug.current}
                                className="px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide rounded-full bg-[#052f46] text-in-cyan border border-in-cyan/20"
                              >
                                {tag.title}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {/* Title + Excerpt */}
                      <div className="space-y-4 mt-8">
                        <h3 className="text-[1.35rem] md:text-[1.6rem] font-bold text-white font-in-avantgarde leading-snug group-hover:text-in-cyan transition-colors">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-white/75 text-sm md:text-[0.95rem] font-in-poppins leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          {post.author?.image?.asset?.url ? (
                            <div className="relative w-9 h-9 rounded-full overflow-hidden">
                              <Image
                                src={post.author.image.asset.url}
                                alt={post.author.name}
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-in-cyan/30 flex items-center justify-center text-xs text-white font-bold">
                              {post.author?.name?.charAt(0) || "A"}
                            </div>
                          )}

                          <div className="flex flex-col leading-tight">
                            <span className="text-white text-sm font-semibold">
                              {post.author?.name || "INB2B"}
                            </span>
                            <time className="text-white/60 text-xs">
                              {formatFechaCompleta(post.publishedAt)}
                            </time>
                          </div>
                        </div>

                        <button className="flex items-center gap-1.5 text-white/70 hover:text-in-cyan text-sm transition-colors">
                          <Share2 className="w-4 h-4" />
                          Compartir
                        </button>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative aspect-[16/9] md:aspect-auto md:h-[300px] md:min-h-[260px] rounded-[22px] md:rounded-[26px] overflow-hidden bg-[#0c2e45] w-full md:max-w-[520px] md:flex-[1.05] md:flex-shrink-0 border border-white/5">
                      <Image
                        src={urlFor(post.cover.asset)
                          .width(900)
                          .height(675)
                          .quality(85)
                          .auto("format")
                          .url()}
                        alt={post.cover.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority
                      />
                    </div>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-2.5 mt-6">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === selectedIndex ? "bg-in-cyan" : "bg-white/25"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}