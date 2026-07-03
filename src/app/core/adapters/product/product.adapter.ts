import { UNICODE } from '@/app/shared/constants/unicode';

import {
  ENUM_ATTRIBUTE_KEYS,
  NUMBER_ATTRIBUTE_KEYS,
  PRODUCT_ATTRIBUTES_DTO,
} from './product.constants';

import type { ProductCard } from '@/app/shared/components/product-card';
import type {
  AttributeDto,
  AttributeValueDtoEnum,
  EnumProductAttributes,
  NumberProductAttributes,
  ProductAttributes,
  ProductPriceDto,
  ProductPriceUi,
  ProductsDto,
} from './product.types';

class ProductAdapter {
  static toFrontendProducts(rawData: ProductsDto): ProductCard[] {
    return rawData.flatMap(({ product }) => {
      const current = product?.masterData?.current;
      const masterVariant = current?.masterVariant;
      const price = masterVariant?.price;

      if (!current || !masterVariant || typeof price?.value?.centAmount !== 'number') {
        return [];
      }

      const { publisher, issue, releaseYear } = this.getProductAttributes(current.attributesRaw);
      const { oldPrice, currentPrice, discount } = this.getProductPrice({
        price: price.value.centAmount,
        discountedPrice: price.discounted?.value.centAmount,
        discount: price.discounted?.discount?.value.permyriad,
      });
      const availableQuantity = masterVariant.availability?.noChannel?.availableQuantity;

      return {
        id: product.id,
        heading: this.buildProductHeading(current.name, releaseYear, issue),
        subheading: publisher || '',
        img: masterVariant.images.at(0)?.url || '',
        currentPrice,
        oldPrice,
        discount,
        count: typeof availableQuantity === 'number' ? availableQuantity : 0,
        sku: masterVariant.sku,
      };
    });
  }

  static buildProductHeading(
    name: string | null,
    releaseYear: ProductAttributes['releaseYear'],
    issue: ProductAttributes['issue'],
  ): string {
    const parts: string[] = [];

    if (name) {
      parts.push(name);
    }

    if (releaseYear) {
      parts.push(`(${releaseYear})`);
    }

    if (issue) {
      parts.push(`#${issue}`);
    }

    return parts.join(' ') || UNICODE.mdash;
  }

  static getProductPrice({ price, discountedPrice, discount }: ProductPriceDto): ProductPriceUi {
    return {
      oldPrice: price,
      currentPrice: typeof discountedPrice === 'number' ? discountedPrice : price,
      discount: typeof discount === 'number' ? discount / 100 : 0,
    };
  }

  static getProductAttributes(attrs: AttributeDto[]): ProductAttributes {
    return attrs.reduce<ReturnType<typeof this.getProductAttributes>>(
      (acc, attr) => {
        const { name, value } = attr;

        const enumKey: keyof EnumProductAttributes | undefined = ENUM_ATTRIBUTE_KEYS[name];
        if (enumKey && this._isAttributeValueEnum(value)) {
          acc[enumKey] = value.label;
          return acc;
        }

        const numberKey: keyof NumberProductAttributes | undefined = NUMBER_ATTRIBUTE_KEYS[name];
        if (numberKey && typeof value === 'number') {
          acc[numberKey] = value;
          return acc;
        }

        if (name === PRODUCT_ATTRIBUTES_DTO.releaseDate && typeof value === 'string') {
          const date = new Date(value);

          acc.releaseDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          });
          acc.releaseYear = date.getUTCFullYear();
          return acc;
        }

        return acc;
      },
      {
        coverArtist: null,
        genre: null,
        issue: null,
        pageCount: null,
        penciller: null,
        publisher: null,
        releaseDate: null,
        releaseYear: null,
        writer: null,
      },
    );
  }

  private static _isAttributeValueEnum = (
    value: AttributeDto['value'],
  ): value is AttributeValueDtoEnum =>
    typeof value === 'object' &&
    value !== null &&
    'key' in value &&
    typeof value.key === 'string' &&
    'label' in value &&
    typeof value.label === 'string';
}

export default ProductAdapter;
