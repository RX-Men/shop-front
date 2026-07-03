import ProductAdapter from '../../adapters/product';

import { PRODUCT_ATTRIBUTES_DTO } from '@/app/shared/constants/product';
import { CATALOG_SORT, DEFAULT_CATALOG_LIMIT, SORT_ORDER } from './catalog.constants';

import type {
  GetCatalogFiltersQuery,
  GetCatalogProductsQuery,
  SearchFieldType,
  SearchQueryInput,
  SearchSortingInput,
} from '../../graphql/generated.types';
import type { CatalogState } from './catalog.types';
import type { ProductCard } from '@/app/shared/components/product-card';
import type { GroupFilters } from '@/app/features/catalog/components/catalog-filters/catalog-filters.types';

interface ToBackendCatalogInitial {
  filter: CatalogState['data']['selectedFilters'];
  sort: CatalogState['data']['sort'];
  limit: CatalogState['data']['limit'];
  page: CatalogState['data']['page'];
}

interface ToBackendCatalogTarget {
  filter: SearchQueryInput | null;
  sort: SearchSortingInput | null;
  limit: number;
  offset: number;
}

interface ToFrontendCatalogTarget {
  products: ProductCard[];
  page: number;
  total: number;
}

class CatalogAdapter {
  static toBackendCatalog(rawData: ToBackendCatalogInitial): ToBackendCatalogTarget {
    return {
      filter: this._toBackendFilter(rawData.filter),
      sort: this._toBackendSort(rawData.sort),
      limit: this._toBackendLimit(rawData.limit),
      offset: this._toBackendOffset({ page: rawData.page, limit: rawData.limit }),
    };
  }

  static toFrontendCatalog(rawDto: GetCatalogProductsQuery): ToFrontendCatalogTarget {
    const { productsSearch } = rawDto;
    if (!productsSearch) {
      return {
        products: [],
        page: 0,
        total: 0,
      };
    }

    return {
      products: ProductAdapter.toFrontendProducts(productsSearch.results),
      page: Math.trunc(Number(productsSearch.offset) / (productsSearch.limit || 1)),
      total: typeof productsSearch.total === 'number' ? productsSearch.total : 0,
    };
  }

  static toFrontendCatalogFilters(rawDto: GetCatalogFiltersQuery): GroupFilters[] {
    const { productType } = rawDto;
    if (!productType) {
      return [];
    }

    return productType.attributeDefinitions.results.flatMap((group) => {
      if (!group.label) {
        return [];
      }

      return {
        label: group.label,
        value: group.name,
        items: group.type.values.results.map((groupItem) => ({
          label: groupItem.label,
          value: groupItem.key,
        })),
      };
    });
  }

  private static _toBackendFilter(
    rawData: ToBackendCatalogInitial['filter'],
  ): ToBackendCatalogTarget['filter'] | null {
    const groups = Object.keys(rawData);

    if (groups.length === 0 || Object.values(rawData).every((value) => value.size === 0)) {
      return null;
    }

    const coverArtist = this._toBackendFilterGroup(
      rawData[PRODUCT_ATTRIBUTES_DTO.coverArtist],
      `attributes.${PRODUCT_ATTRIBUTES_DTO.coverArtist}.key`,
      'enum',
    );
    const genre = this._toBackendFilterGroup(
      rawData[PRODUCT_ATTRIBUTES_DTO.genre],
      `attributes.${PRODUCT_ATTRIBUTES_DTO.genre}.key`,
      'enum',
    );
    const penciller = this._toBackendFilterGroup(
      rawData[PRODUCT_ATTRIBUTES_DTO.penciller],
      `attributes.${PRODUCT_ATTRIBUTES_DTO.penciller}.key`,
      'enum',
    );
    const publisher = this._toBackendFilterGroup(
      rawData[PRODUCT_ATTRIBUTES_DTO.publisher],
      `attributes.${PRODUCT_ATTRIBUTES_DTO.publisher}.key`,
      'enum',
    );
    const writer = this._toBackendFilterGroup(
      rawData[PRODUCT_ATTRIBUTES_DTO.writer],
      `attributes.${PRODUCT_ATTRIBUTES_DTO.writer}.key`,
      'enum',
    );

    const filter: SearchQueryInput[] = [
      ...coverArtist,
      ...genre,
      ...penciller,
      ...publisher,
      ...writer,
    ];

    if (filter.length > 1) {
      return { and: filter };
    }

    if (filter.length === 1) {
      return filter[0] || null;
    }

    return null;
  }

  private static _toBackendFilterGroup(
    group: Set<string> | undefined,
    field: string,
    fieldType: SearchFieldType,
  ): SearchQueryInput[] {
    if (!group) {
      return [];
    }

    const filter: SearchQueryInput[] = [];

    if (group.size === 1) {
      const value = Array.from(group.values()).at(0);
      if (!value) {
        return [];
      }
      filter.push(this._toBackendExactSearchValue(field, fieldType, value));
    } else if (group.size > 1) {
      filter.push({
        or: Array.from(group.values()).map((value) =>
          this._toBackendExactSearchValue(field, fieldType, value),
        ),
      });
    }

    return filter;
  }

  private static _toBackendExactSearchValue(
    field: string,
    fieldType: SearchFieldType,
    rawValue: string,
  ): Pick<SearchQueryInput, 'exact'> {
    return {
      exact: {
        field,
        fieldType,
        value: rawValue,
      },
    };
  }

  private static _toBackendSort(
    rawData: ToBackendCatalogInitial['sort'],
  ): ToBackendCatalogTarget['sort'] | null {
    if (!rawData) {
      return null;
    }

    switch (rawData) {
      case CATALOG_SORT.titleAsc:
        return {
          field: 'name',
          order: SORT_ORDER.asc,
          language: 'en-US',
        };
      case CATALOG_SORT.titleDesc:
        return {
          field: 'name',
          order: SORT_ORDER.desc,
          language: 'en-US',
        };
      case CATALOG_SORT.dateAsc:
        return {
          field: `attributes.${PRODUCT_ATTRIBUTES_DTO.releaseDate}`,
          order: SORT_ORDER.asc,
          fieldType: 'date',
        };
      case CATALOG_SORT.dateDesc:
        return {
          field: `attributes.${PRODUCT_ATTRIBUTES_DTO.releaseDate}`,
          order: SORT_ORDER.desc,
          fieldType: 'date',
        };
      case CATALOG_SORT.priceAsc:
        return { field: 'variants.prices.centAmount', order: SORT_ORDER.asc, fieldType: 'money' };
      case CATALOG_SORT.priceDesc:
        return { field: 'variants.prices.centAmount', order: SORT_ORDER.desc, fieldType: 'money' };
      default:
        return null;
    }
  }

  private static _toBackendLimit(
    rawData: ToBackendCatalogInitial['limit'],
  ): ToBackendCatalogTarget['limit'] {
    return Number(rawData || DEFAULT_CATALOG_LIMIT);
  }

  private static _toBackendOffset(
    rawData: Pick<ToBackendCatalogInitial, 'page' | 'limit'>,
  ): ToBackendCatalogTarget['offset'] {
    return rawData.page * Number(rawData.limit || DEFAULT_CATALOG_LIMIT);
  }
}

export default CatalogAdapter;
