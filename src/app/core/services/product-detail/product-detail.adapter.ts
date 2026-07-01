import {
  buildProductHeading,
  getProductAttributes,
} from '@/app/shared/utils/get-product-attributes';

import type { GetProductDetailQuery } from '../../graphql/generated.types';
import type { ProductDetail } from './product-detail.types';

class ProductDetailAdapter {
  static toFrontendProductDetail({ product }: GetProductDetailQuery): ProductDetail | null {
    if (!product) {
      return null;
    }

    const { id, masterData } = product;
    if (!masterData) {
      return null;
    }

    const { current } = masterData;
    if (!current) {
      return null;
    }

    const { name, description, attributesRaw, allVariants } = current;
    const {
      coverArtist,
      genre,
      issue,
      pageCount,
      penciller,
      publisher,
      releaseDate,
      releaseYear,
      writer,
    } = getProductAttributes(attributesRaw);
    const variant = allVariants?.at(0);
    const price = variant?.prices?.at(0)?.value.centAmount;

    return {
      id,
      heading: buildProductHeading(name, releaseYear, issue),
      subheading: publisher,
      genre,
      description,
      writer,
      penciller,
      coverArtist,
      img: variant?.images.at(0)?.url || '',
      currentPrice: typeof price === 'number' ? price : null,
      oldPrice: typeof price === 'number' ? price : null,
      sku: variant?.sku || null,
      pageCount,
      discount: 0, // mock
      count: 10, // mock
      releaseDate,
    };
  }
}

export default ProductDetailAdapter;
