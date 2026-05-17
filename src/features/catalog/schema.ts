import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  compareAtCents: z.number().int().nonnegative().nullable(),
  currency: z.string().default("USD"),
  images: z.array(z.string().url()),
  categoryId: z.string(),
  categorySlug: z.string(),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
});
export type Product = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  productCount: z.number().int().nonnegative(),
});
export type Category = z.infer<typeof categorySchema>;

export const productListQuerySchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().nonnegative().optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "rating"]).default("newest"),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(60).default(24),
});
export type ProductListQuery = z.infer<typeof productListQuerySchema>;

export const searchQuerySchema = z.object({
  q: z.string().default(""),
});
export type SearchQuery = z.infer<typeof searchQuerySchema>;
