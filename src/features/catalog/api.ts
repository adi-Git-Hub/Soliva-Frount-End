import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { env } from "@/config/env";
import {
  findCategoryBySlug,
  findProductBySlug,
  mockCategories,
  mockProducts,
  productsByCategory,
  searchProducts,
} from "@/lib/mock-data";

import type {
  Category,
  Product,
  ProductListQuery,
} from "./schema";

// ---- Fetchers ----

async function fetchProducts(query: ProductListQuery): Promise<Product[]> {
  if (env.VITE_USE_MOCK_API) {
    await delay();
    let list = query.category
      ? productsByCategory(query.category)
      : [...mockProducts];

    if (query.minPrice != null)
      list = list.filter((p) => p.priceCents >= query.minPrice! * 100);
    if (query.maxPrice != null)
      list = list.filter((p) => p.priceCents <= query.maxPrice! * 100);

    switch (query.sort) {
      case "price-asc":
        list.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v != null) params.set(k, String(v));
  });
  return api.get<Product[]>(`/products?${params.toString()}`);
}

async function fetchProduct(slug: string): Promise<Product> {
  if (env.VITE_USE_MOCK_API) {
    await delay();
    const p = findProductBySlug(slug);
    if (!p) throw new Error("Product not found");
    return p;
  }
  return api.get<Product>(`/products/${slug}`);
}

async function fetchCategories(): Promise<Category[]> {
  if (env.VITE_USE_MOCK_API) {
    await delay();
    return mockCategories;
  }
  return api.get<Category[]>(`/categories`);
}

async function fetchCategory(slug: string): Promise<Category> {
  if (env.VITE_USE_MOCK_API) {
    await delay();
    const c = findCategoryBySlug(slug);
    if (!c) throw new Error("Category not found");
    return c;
  }
  return api.get<Category>(`/categories/${slug}`);
}

async function fetchSearch(q: string): Promise<Product[]> {
  if (env.VITE_USE_MOCK_API) {
    await delay();
    return searchProducts(q);
  }
  return api.get<Product[]>(`/search?q=${encodeURIComponent(q)}`);
}

function delay() {
  return new Promise<void>((r) => setTimeout(r, 200));
}

// ---- Query hooks ----

export const catalogKeys = {
  all: ["catalog"] as const,
  products: (query: ProductListQuery) =>
    ["catalog", "products", query] as const,
  product: (slug: string) => ["catalog", "product", slug] as const,
  categories: () => ["catalog", "categories"] as const,
  category: (slug: string) => ["catalog", "category", slug] as const,
  search: (q: string) => ["catalog", "search", q] as const,
};

export function useProducts(query: ProductListQuery) {
  return useQuery({
    queryKey: catalogKeys.products(query),
    queryFn: () => fetchProducts(query),
    staleTime: 60_000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: catalogKeys.product(slug),
    queryFn: () => fetchProduct(slug),
    staleTime: 60_000,
    enabled: Boolean(slug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 5 * 60_000,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: catalogKeys.category(slug),
    queryFn: () => fetchCategory(slug),
    staleTime: 5 * 60_000,
    enabled: Boolean(slug),
  });
}

export function useSearch(q: string) {
  return useQuery({
    queryKey: catalogKeys.search(q),
    queryFn: () => fetchSearch(q),
    staleTime: 30_000,
    enabled: q.trim().length > 0,
  });
}
