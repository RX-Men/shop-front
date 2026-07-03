import type { EnumProductAttributes, NumberProductAttributes } from './product.types';

export const PRODUCT_ATTRIBUTES_DTO = {
  coverArtist: 'cover-artist',
  editionType: 'edition-type',
  genre: 'genre',
  issueNumber: 'issue-number',
  pageCount: 'page-count',
  penciller: 'penciller',
  publisher: 'publisher',
  releaseDate: 'release-date',
  series: 'series',
  seriesYear: 'series-year',
  writer: 'writer',
} as const;

export const ENUM_ATTRIBUTE_KEYS: Record<string, keyof EnumProductAttributes> = {
  [PRODUCT_ATTRIBUTES_DTO.coverArtist]: 'coverArtist',
  [PRODUCT_ATTRIBUTES_DTO.genre]: 'genre',
  [PRODUCT_ATTRIBUTES_DTO.penciller]: 'penciller',
  [PRODUCT_ATTRIBUTES_DTO.publisher]: 'publisher',
  [PRODUCT_ATTRIBUTES_DTO.writer]: 'writer',
} as const;

export const NUMBER_ATTRIBUTE_KEYS: Record<string, keyof NumberProductAttributes> = {
  [PRODUCT_ATTRIBUTES_DTO.issueNumber]: 'issue',
  [PRODUCT_ATTRIBUTES_DTO.pageCount]: 'pageCount',
} as const;
