import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  caption?: string;
}

export interface BlogAuthor {
  name: string;
  slug: { current: string };
  image?: {
    asset: { url: string };
  };
}

export interface BlogCategory {
  title: string;
  slug: { current: string };
}

export interface BlogTag {
  title: string;
  slug: { current: string };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  cover: SanityImage;
  category?: BlogCategory;
  author?: BlogAuthor;
  tags?: BlogTag[];
}
export interface BlogBanner {
  imageUrl: string;
  alt: string;
  active: boolean;
}

export interface BlogPopup {
  imageUrl: string;
  alt: string;
  link?: string;
  active: boolean;
}

export interface BlogPostDetail extends BlogPost {
  tags?: BlogTag[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  body: PortableTextBlock[];
}
