import {
  buildProductHeading,
  getProductAttributes,
} from '@/app/shared/utils/get-product-attributes';

import type { GetNewProductsQuery, GetTrendingProductsQuery } from '../../graphql/generated.types';
import type { ProductCard } from '@/app/shared/components/product-card';

type GetNewProductsQueryResultsDto = NonNullable<GetNewProductsQuery['productsSearch']>['results'];
type GetTrendingProductsQueryResultsDto = NonNullable<
  GetTrendingProductsQuery['productSelection']
>['productRefs']['results'];

class HomeAdapter {
  static toFrontendNewProducts(rawData: GetNewProductsQuery): ProductCard[] {
    const { productsSearch } = rawData;
    if (!productsSearch) {
      return [];
    }

    return this._toFrontendProducts(productsSearch.results);
  }

  static toFrontendTrendingProducts(rawData: GetTrendingProductsQuery): ProductCard[] {
    const { productSelection } = rawData;
    if (!productSelection) {
      return [];
    }

    return this._toFrontendProducts(productSelection.productRefs.results);
  }

  // TODO: reuse this method in single tasks for all product adapters (create global util?)
  // Also need to recheck contracts with backend
  private static _toFrontendProducts(
    rawData: GetNewProductsQueryResultsDto | GetTrendingProductsQueryResultsDto,
  ): ProductCard[] {
    return rawData.flatMap(({ product }) => {
      if (!product) {
        return [];
      }

      const { current } = product.masterData;
      if (!current) {
        return [];
      }

      const { masterVariant } = current;
      if (!masterVariant) {
        return [];
      }

      const { price } = masterVariant;
      if (!price) {
        return [];
      }

      if (typeof price.value.centAmount !== 'number') {
        return [];
      }

      const { publisher, issue, releaseYear } = getProductAttributes(current.attributesRaw);

      return {
        id: product.id,
        heading: buildProductHeading(current.name, releaseYear, issue),
        subheading: publisher || '',
        img: masterVariant.images.at(0)?.url || '',
        currentPrice: price.value.centAmount,
        oldPrice: price.value.centAmount,
        discount: 0, // TODO: mock; need to update Commercetools
        count: 10, // TODO: mock; need to update Commercetools
      };
    });
  }
}

export default HomeAdapter;
