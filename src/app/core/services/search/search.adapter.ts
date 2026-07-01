import {
  buildProductHeading,
  getProductAttributes,
} from '@/app/shared/utils/get-product-attributes';

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

    const results = productsSearch.results.flatMap(({ product }) => {
      const { current } = product.masterData;
      if (!current) {
        return [];
      }

      const { images, price } = current.masterVariant;
      if (!price || typeof price.value.centAmount !== 'number') {
        return [];
      }

      const { publisher, issue, releaseYear } = getProductAttributes(current.attributesRaw);

      return {
        id: product.id,
        heading: buildProductHeading(current.name, releaseYear, issue),
        subheading: publisher || '',
        img: images.at(0)?.url || '',
        currentPrice: price.value.centAmount,
        oldPrice: price.value.centAmount,
        discount: 0, // TODO: mock; need to update Commercetools
        count: 10, // TODO: mock; need to update Commercetools
      };
    });
    const total = typeof productsSearch.total === 'number' ? productsSearch.total : results.length;

    return {
      results,
      total,
    };
  }
}

export default SearchAdapter;
