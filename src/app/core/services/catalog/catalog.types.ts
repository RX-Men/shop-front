import type { GroupFilters } from '@/app/features/catalog/components/catalog-filters/catalog-filters.types';
import type { ProductCard } from '@/app/shared/components/product-card';

type CatalogSelectedFiltersState = Record<string, Set<string>>;
type CatalogOffsetState = number;

interface CatalogState {
  data: {
    products: ProductCard[];
    filters: GroupFilters[] | null;
    selectedFilters: CatalogSelectedFiltersState;
    sort: string | null;
    limit: string | null;
    offset: CatalogOffsetState;
    total: number;
  };
}

export type { CatalogState, CatalogOffsetState };
