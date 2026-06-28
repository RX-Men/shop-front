import { computed, inject, Injectable, signal } from '@angular/core';

import { COMMERCETOOLS_CONFIG } from '../commercetools/commercetools.config';
import { CommercetoolsService } from '../commercetools';

import { GET_CATALOG } from './graphql/catalog.queries';
import { GET_CATALOG_FILTERS } from './graphql/filters.queries';

import CatalogAdapter from './catalog.adapter';

import { CATALOG_LIMIT } from './catalog.constants';

import type { GetCatalogFiltersQuery, GetCatalogQuery } from '../../graphql/generated.types';
import type { CatalogState } from './catalog.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly _commercetoolsService = inject(CommercetoolsService);
  private readonly _ctpConfig = inject(COMMERCETOOLS_CONFIG);

  private readonly _state = signal<CatalogState>({
    data: {
      products: [],
      filters: null,
      selectedFilters: {},
      sort: null,
      limit: CATALOG_LIMIT[24],
      offset: 0,
      total: 0,
    },
  });

  readonly products = computed(() => this._state().data.products);
  readonly filters = computed(() => this._state().data.filters);
  readonly selectedFilters = computed(() => this._state().data.selectedFilters);
  readonly sort = computed(() => this._state().data.sort);
  readonly limit = computed(() => this._state().data.limit);
  readonly offset = computed(() => this._state().data.offset);
  readonly total = computed(() => this._state().data.total);

  changeFilters({ groupName, value }: { groupName: string; value: string }): void {
    const next = new Set(this.selectedFilters()[groupName]);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }

    this._state.update((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        selectedFilters: {
          ...prevState.data.selectedFilters,
          [groupName]: next,
        },
      },
    }));

    this.fetchProducts();
  }

  resetFilters(): void {
    this._state.update((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        selectedFilters: {},
      },
    }));

    this.fetchProducts();
  }

  changeSort(sort: string | null): void {
    this._state.update((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        sort,
      },
    }));

    this.fetchProducts();
  }

  changeLimit(limit: string | null): void {
    this._state.update((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        limit,
      },
    }));

    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    const { projectKey } = this._ctpConfig;

    const queryText = GET_CATALOG.loc?.source.body || '';
    const { filter, sort, limit } = CatalogAdapter.toBackendCatalog({
      filter: this.selectedFilters(),
      sort: this.sort(),
      limit: this.limit(),
    });

    try {
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetCatalog',
            variables: {
              postFilter: filter,
              sort: sort || null,
              limit,
            },
          },
        })
        .execute();

      const rawDto = response.body.data as GetCatalogQuery;

      const { products, offset, total } = CatalogAdapter.toFrontendCatalog(rawDto);
      this._state.update((prevState) => ({
        ...prevState,
        data: { ...prevState.data, products, offset, total },
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async fetchFilters(): Promise<void> {
    const { projectKey } = this._ctpConfig;

    try {
      const queryText = GET_CATALOG_FILTERS.loc?.source.body || '';
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetCatalogFilters',
          },
        })
        .execute();

      const rawDto = response.body.data as GetCatalogFiltersQuery;

      const data = CatalogAdapter.toFrontendCatalogFilters(rawDto);
      this._state.update((prevState) => ({
        ...prevState,
        data: { ...prevState.data, filters: data },
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
