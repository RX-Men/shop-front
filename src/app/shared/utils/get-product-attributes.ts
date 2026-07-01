import { PRODUCT_ATTRIBUTES_DTO } from '../constants/product';

import { UNICODE } from '../constants/unicode';

interface AttributeDto {
  name: string;
  value: unknown;
}

interface AttributeValueDtoEnum {
  key: string;
  label: string;
}

interface ProductAttributes {
  coverArtist: string | null;
  genre: string | null;
  issue: number | null;
  pageCount: number | null;
  penciller: string | null;
  publisher: string | null;
  releaseDate: string | null;
  releaseYear: number | null;
  writer: string | null;
}

const isAttributeValueEnum = (value: AttributeDto['value']): value is AttributeValueDtoEnum =>
  typeof value === 'object' &&
  value !== null &&
  'key' in value &&
  typeof value.key === 'string' &&
  'label' in value &&
  typeof value.label === 'string';

export const getProductAttributes = (attrs: AttributeDto[]): ProductAttributes =>
  attrs.reduce<ReturnType<typeof getProductAttributes>>(
    (acc, attr) => {
      const { name, value } = attr;

      if (name === PRODUCT_ATTRIBUTES_DTO.coverArtist && isAttributeValueEnum(value)) {
        acc.coverArtist = value.label;
        return acc;
      }

      if (name === PRODUCT_ATTRIBUTES_DTO.genre && isAttributeValueEnum(value)) {
        acc.genre = value.label;
        return acc;
      }

      if (name === PRODUCT_ATTRIBUTES_DTO.issueNumber && typeof value === 'number') {
        acc.issue = value;
        return acc;
      }

      if (name === PRODUCT_ATTRIBUTES_DTO.pageCount && typeof value === 'number') {
        acc.pageCount = value;
        return acc;
      }

      if (name === PRODUCT_ATTRIBUTES_DTO.penciller && isAttributeValueEnum(value)) {
        acc.penciller = value.label;
        return acc;
      }

      if (name === PRODUCT_ATTRIBUTES_DTO.publisher && isAttributeValueEnum(value)) {
        acc.publisher = value.label;
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

      if (name === PRODUCT_ATTRIBUTES_DTO.writer && isAttributeValueEnum(value)) {
        acc.writer = value.label;
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

export const buildProductHeading = (
  name: string | null,
  releaseYear: ProductAttributes['releaseYear'],
  issue: ProductAttributes['issue'],
): string => {
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
};
