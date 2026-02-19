import { z } from "zod"
import { formContactHomeSchema } from "@/schemas"

export type FormContactHomeType = z.infer<typeof formContactHomeSchema>

export type {
  BlogPost,
  BlogPostDetail,
  BlogAuthor,
  BlogCategory,
  BlogTag,
  SanityImage,
} from "./blog"