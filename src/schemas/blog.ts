import * as z from "zod";

const sanityImageSchema = z.object({
  asset: z.object({
    _id: z.string(),
    url: z.string(),
    metadata: z
      .object({
        lqip: z.string().optional(),
      })
      .optional(),
  }),
  alt: z.string().optional(),
});

const authorSchema = z.object({
  name: z.string(),
  slug: z.object({ current: z.string() }),
  image: z
    .object({
      asset: z.object({ url: z.string() }),
    })
    .optional(),
});

const categorySchema = z.object({
  title: z.string(),
  slug: z.object({ current: z.string() }),
});

export const blogPostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
  excerpt: z.string().optional(),
  publishedAt: z.string(),
  cover: sanityImageSchema,
  category: categorySchema.optional(),
  author: authorSchema.optional(),
});

export const blogListSchema = z.array(blogPostSchema);
