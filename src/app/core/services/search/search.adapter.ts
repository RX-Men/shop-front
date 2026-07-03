import ProductAdapter from '../../adapters/product';

import type { GetProductsSearchByTextQuery } from '../../graphql/generated.types';
import type { ProductsSearchResultsByText } from './search.types';

class SearchAdapter {
  static toFrontendSearchResultsByText(
    rawData: GetProductsSearchByTextQuery,
  ): ProductsSearchResultsByText {
    const { productsSearch } = rawData;
    if (!productsSearch) {
      return {
        results: [],
        total: 0,
      };
    }

    const results = ProductAdapter.toFrontendProducts(productsSearch.results);
    const total = typeof productsSearch.total === 'number' ? productsSearch.total : results.length;

    return {
      results,
      total,
    };
  }
}

export default SearchAdapter;
