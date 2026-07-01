import type { ProductCard } from '@/app/shared/components/product-card';

interface ProductsSearchResultsByText {
  results: ProductCard[] | null;
  total: number;
}

export type { ProductsSearchResultsByText };
