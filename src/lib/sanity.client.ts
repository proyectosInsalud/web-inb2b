import { createClient } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN activado para lectura pública ultrarrápida
});

// Cliente con token para revalidación, previsualización y operaciones administrativas
export const sanityAdminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // No usar CDN con el token para evitar inconsistencias
  token,
});

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
