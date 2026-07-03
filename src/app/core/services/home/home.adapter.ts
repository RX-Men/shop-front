import ProductAdapter from '../../adapters/product';

import type { GetNewProductsQuery, GetTrendingProductsQuery } from '../../graphql/generated.types';
import type { ProductCard } from '@/app/shared/components/product-card';

class HomeAdapter {
  static toFrontendNewProducts(rawData: GetNewProductsQuery): ProductCard[] {
    const { productsSearch } = rawData;
    if (!productsSearch) {
      return [];
    }

    return ProductAdapter.toFrontendProducts(productsSearch.results);
  }

  static toFrontendTrendingProducts(rawData: GetTrendingProductsQuery): ProductCard[] {
    const { productSelection } = rawData;
    if (!productSelection) {
      return [];
    }

    return ProductAdapter.toFrontendProducts(productSelection.productRefs.results);
  }
}

export default HomeAdapter;
