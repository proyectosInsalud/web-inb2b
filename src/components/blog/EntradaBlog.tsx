import Image from "next/image";
import Link from "next/link";
import type { BlogPostDetail } from "@/types/blog";
import { urlFor } from "@/lib/sanity.client";
import { formatFechaPeru } from "@/helpers/formatFechaPeru";
import { PortableArticle } from "./PortableArticle";
import { ArrowLeft } from "lucide-react";

interface EntradaBlogProps {
  post: BlogPostDetail;
}

export function EntradaBlog({ post }: EntradaBlogProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-white/60 hover:text-in-cyan transition-colors mb-6 font-in-poppins text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al blog
      </Link>

      <header className="mb-8">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <span className="bg-in-cyan text-black text-xs font-bold px-4 py-1 rounded-full font-in-poppins uppercase">
                {post.category.title}
              </span>
            )}
          </div>
          {post.tags?.length ? (
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.slug.current}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] rounded-full bg-in-blue-dark text-in-cyan border border-in-cyan/25"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-in-avantgarde leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-white/50 font-in-poppins">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image?.asset?.url ? (
                <Image
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-in-cyan/30 flex items-center justify-center text-xs text-white font-bold">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <span className="text-white">{post.author.name}</span>
            </div>
          )}
          <time>{formatFechaPeru(post.publishedAt)}</time>
        </div>
      </header>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-white/10">
        <Image
          src={urlFor(post.cover.asset)
            .width(1200)
            .height(675)
            .quality(85)
            .auto("format")
            .url()}
          alt={post.cover.alt || post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          {...(post.cover.asset.metadata?.lqip
            ? { placeholder: "blur", blurDataURL: post.cover.asset.metadata.lqip }
            : {})}
        />
      </div>

      <PortableArticle body={post.body} />
    </div>
  );
}
