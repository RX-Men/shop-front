import { inject, Injectable } from '@angular/core';
import { print } from 'graphql';

import { COMMERCETOOLS_CONFIG } from '../commercetools/commercetools.config';
import { CommercetoolsService } from '../commercetools';

import SearchAdapter from './search.adapter';

import { GET_PRODUCTS_SEARCH_BY_TEXT } from './graphql/get-products-search-by-text';

import type { GetProductsSearchByTextQuery } from '../../graphql/generated.types';
import type { ProductsSearchResultsByText } from './search.types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly _commercetoolsService = inject(CommercetoolsService);
  private readonly _ctpConfig = inject(COMMERCETOOLS_CONFIG);

  async fetchProductsByText(query: string): Promise<ProductsSearchResultsByText> {
    const { projectKey } = this._ctpConfig;
    const queryText = print(GET_PRODUCTS_SEARCH_BY_TEXT);

    try {
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetProductsSearchByText',
            variables: {
              searchQuery: `*${query}*`,
            },
          },
        })
        .execute();

      const rawDto = response.body.data;
      if (!rawDto) {
        throw new Error('Commercetools GraphQL response returned empty data');
      }

      return SearchAdapter.toFrontendSearchResultsByText(rawDto as GetProductsSearchByTextQuery);
    } catch (error) {
      console.error(error);
      return {
        results: null,
        total: 0,
      };
    }
  }
}
