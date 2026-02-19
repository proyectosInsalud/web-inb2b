import * as z from "zod";
import { blogPostSchema } from "./blog";

const tagSchema = z.object({
  title: z.string(),
  slug: z.object({ current: z.string() }),
});

export const blogEntradaSchema = blogPostSchema.extend({
  tags: z.array(tagSchema).optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional(),
  body: z.array(z.any()),
});
