import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const url = urlFor(value.asset).width(900).quality(80).auto("format").url();

      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || "Imagen del artículo"}
            width={900}
            height={500}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-white/40 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 font-in-avantgarde">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3 font-in-poppins">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-white mt-6 mb-2 font-in-poppins">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-white/70 leading-relaxed mb-4 font-in-lato text-base md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-in-cyan pl-4 my-6 italic text-white/60">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-in-cyan underline hover:text-in-cyan/70 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-white/70 font-in-lato">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-white/70 font-in-lato">
        {children}
      </ol>
    ),
  },
};

interface PortableArticleProps {
  body: PortableTextBlock[];
}

export function PortableArticle({ body }: PortableArticleProps) {
  return (
    <article className="max-w-none">
      <PortableText value={body} components={components} />
    </article>
  );
}
