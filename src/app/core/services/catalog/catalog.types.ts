import type { GroupFilters } from '@/app/features/catalog/components/catalog-filters/catalog-filters.types';
import type { ProductCard } from '@/app/shared/components/product-card';

type CatalogSelectedFiltersState = Record<string, Set<string>>;
type CatalogPageState = number;

interface CatalogState {
  data: {
    products: ProductCard[];
    filters: GroupFilters[] | null;
    selectedFilters: CatalogSelectedFiltersState;
    sort: string | null;
    limit: string | null;
    page: number;
    total: number;
  };
  loading: {
    products: boolean;
    filters: boolean;
  };
}

export type { CatalogState, CatalogPageState };
