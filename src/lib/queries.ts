import { groq } from "next-sanity";

export const POSTS_PAGINATED = groq`
  *[_type == "post"
    && ($search == "" || title match ($search + "*") || excerpt match ($search + "*"))
    && ($category == "" || category->slug.current == $category)
    && ($tag == "" || $tag in tags[]->slug.current)
  ] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    cover {
      asset-> { _id, url, metadata { lqip } },
      alt
    },
    category-> { title, slug },
    tags[]-> { title, slug },
    author-> { name, slug, image { asset-> { url } } }
  }
`;

export const TOTAL_POSTS = groq`
  count(*[_type == "post"
    && ($search == "" || title match ($search + "*") || excerpt match ($search + "*"))
    && ($category == "" || category->slug.current == $category)
    && ($tag == "" || $tag in tags[]->slug.current)
  ])
`;

export const LATEST_POSTS = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    cover {
      asset-> { _id, url, metadata { lqip } },
      alt
    },
    category-> { title, slug },
    tags[]-> { title, slug },
    author-> { name, slug, image { asset-> { url } } }
  }
`;

export const POST_BY_SLUG = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    cover {
      asset-> { _id, url, metadata { lqip } },
      alt
    },
    category-> { title, slug },
    tags[]-> { title, slug },
    author-> { name, slug, image { asset-> { url } } },
    seo { metaTitle, metaDescription },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset-> { _id, url, metadata { lqip, dimensions } }
      }
    }
  }
`;

export const ALL_CATEGORIES = groq`
  *[_type == "category"] | order(title asc) {
    title,
    slug
  }
`;

export const ALL_TAGS = groq`
  *[_type == "tag"] | order(title asc) {
    title,
    slug
  }
`;

export const ACTIVE_BANNER = groq`
  *[_type == "banner"][0] {
    alt,
    image {
      asset-> { url, metadata { lqip } }
    }
  }
`;
