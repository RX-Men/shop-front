import type {
  GetCatalogProductsQuery,
  GetNewProductsQuery,
  GetProductsSearchByTextQuery,
  GetTrendingProductsQuery,
} from '../../graphql/generated.types';

type GetCatalogProductsQueryResultsDto = NonNullable<
  GetCatalogProductsQuery['productsSearch']
>['results'];
type GetNewProductsQueryResultsDto = NonNullable<GetNewProductsQuery['productsSearch']>['results'];
type GetProductsSearchByTextQueryResultsDto = NonNullable<
  GetProductsSearchByTextQuery['productsSearch']
>['results'];
type GetTrendingProductsQueryResultsDto = NonNullable<
  GetTrendingProductsQuery['productSelection']
>['productRefs']['results'];

export type ProductsDto =
  | GetCatalogProductsQueryResultsDto
  | GetNewProductsQueryResultsDto
  | GetProductsSearchByTextQueryResultsDto
  | GetTrendingProductsQueryResultsDto;

export interface AttributeDto {
  name: string;
  value: unknown;
}

export interface AttributeValueDtoEnum {
  key: string;
  label: string;
}

export interface EnumProductAttributes {
  coverArtist: string | null;
  genre: string | null;
  penciller: string | null;
  publisher: string | null;
  writer: string | null;
}

export interface NumberProductAttributes {
  issue: number | null;
  pageCount: number | null;
}

interface RestProductAttributes {
  releaseDate: string | null;
  releaseYear: number | null;
}

export type ProductAttributes = EnumProductAttributes &
  NumberProductAttributes &
  RestProductAttributes;

export interface ProductPriceDto {
  price: number;
  discountedPrice: unknown | undefined;
  discount: number | undefined;
}

export interface ProductPriceUi {
  oldPrice: number;
  currentPrice: number;
  discount: number;
}
