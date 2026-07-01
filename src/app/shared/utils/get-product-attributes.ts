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

interface EnumProductAttributes {
  coverArtist: string | null;
  genre: string | null;
  penciller: string | null;
  publisher: string | null;
  writer: string | null;
}

interface NumberProductAttributes {
  issue: number | null;
  pageCount: number | null;
}

interface RestProductAttributes {
  releaseDate: string | null;
  releaseYear: number | null;
}

type ProductAttributes = EnumProductAttributes & NumberProductAttributes & RestProductAttributes;

const ENUM_ATTRIBUTE_KEYS: Record<string, keyof EnumProductAttributes> = {
  [PRODUCT_ATTRIBUTES_DTO.coverArtist]: 'coverArtist',
  [PRODUCT_ATTRIBUTES_DTO.genre]: 'genre',
  [PRODUCT_ATTRIBUTES_DTO.penciller]: 'penciller',
  [PRODUCT_ATTRIBUTES_DTO.publisher]: 'publisher',
  [PRODUCT_ATTRIBUTES_DTO.writer]: 'writer',
} as const;

const NUMBER_ATTRIBUTE_KEYS: Record<string, keyof NumberProductAttributes> = {
  [PRODUCT_ATTRIBUTES_DTO.issueNumber]: 'issue',
  [PRODUCT_ATTRIBUTES_DTO.pageCount]: 'pageCount',
} as const;

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

      const enumKey: keyof EnumProductAttributes | undefined = ENUM_ATTRIBUTE_KEYS[name];
      if (enumKey && isAttributeValueEnum(value)) {
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
