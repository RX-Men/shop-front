import ProductAdapter from '../../adapters/product';

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

    const { name, description, attributesRaw, masterVariant } = current;
    if (!masterVariant) {
      return null;
    }

    const { availability, images, price, sku } = masterVariant;
    if (!price || typeof price.value.centAmount !== 'number') {
      return null;
    }

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
    } = ProductAdapter.getProductAttributes(attributesRaw);
    const { oldPrice, currentPrice, discount } = ProductAdapter.getProductPrice({
      price: price.value.centAmount,
      discountedPrice: price.discounted?.value.centAmount,
      discount: price.discounted?.discount?.value.permyriad,
    });
    const availableQuantity = availability?.noChannel?.availableQuantity;

    return {
      id,
      heading: ProductAdapter.buildProductHeading(name, releaseYear, issue),
      subheading: publisher,
      genre,
      description,
      writer,
      penciller,
      coverArtist,
      img: images.at(0)?.url || '',
      currentPrice,
      oldPrice,
      sku,
      pageCount,
      discount,
      count: typeof availableQuantity === 'number' ? availableQuantity : 0,
      releaseDate,
    };
  }
}

export default ProductDetailAdapter;
