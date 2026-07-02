/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type SearchAnyValueExpressionInput = {
  boost?: number | null | undefined;
  caseInsensitive?: boolean | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gte?: number | null | undefined;
  language?: string | null | undefined;
  value: unknown;
};

export type SearchDateRangeExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gt?: unknown;
  gte?: unknown;
  lt?: unknown;
  lte?: unknown;
};

export type SearchDateTimeRangeExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gt?: unknown;
  gte?: unknown;
  lt?: unknown;
  lte?: unknown;
};

export type SearchExistsInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  language?: string | null | undefined;
};

export type SearchFieldType =
  /** Field type for boolean values. */
  | 'boolean'
  /** Field type for date values. */
  | 'date'
  /** Field type for datetime values. */
  | 'datetime'
  /** Field type for enum values. */
  | 'enum'
  /** Field type for localized enum values. */
  | 'lenum'
  /** Field type for localized text values. */
  | 'ltext'
  /** Field type for money values. */
  | 'money'
  /** Field type for number values. */
  | 'number'
  /** Field type for reference values. */
  | 'reference'
  /** Field type for set of boolean values. */
  | 'set_boolean'
  /** Field type for set of date values. */
  | 'set_date'
  /** Field type for set of datetime values. */
  | 'set_datetime'
  /** Field type for set of enum values. */
  | 'set_enum'
  /** Field type for set of localized enum values. */
  | 'set_lenum'
  /** Field type for set of localized text values. */
  | 'set_ltext'
  /** Field type for set of money values. */
  | 'set_money'
  /** Field type for set of number values. */
  | 'set_number'
  /** Field type for set of reference values. */
  | 'set_reference'
  /** Field type for set of text values. */
  | 'set_text'
  /** Field type for set of time values. */
  | 'set_time'
  /** Field type for text values. */
  | 'text'
  /** Field type for time values. */
  | 'time';

export type SearchFilterExpressionInput = {
  and?: Array<SearchQueryInput> | null | undefined;
  exact?: SearchAnyValueExpressionInput | null | undefined;
  exists?: SearchExistsInput | null | undefined;
  filter?: Array<SearchQueryInput> | null | undefined;
  fullText?: SearchFullTextExpressionInput | null | undefined;
  fullTextPrefix?: SearchFullTextPrefixInput | null | undefined;
  fuzzy?: SearchFuzzyExpressionInput | null | undefined;
  not?: Array<SearchQueryInput> | null | undefined;
  or?: Array<SearchQueryInput> | null | undefined;
  prefix?: SearchAnyValueExpressionInput | null | undefined;
  range?: SearchQueryRangeExpressionInput | null | undefined;
  wildcard?: SearchAnyValueExpressionInput | null | undefined;
};

export type SearchFullTextExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  language?: string | null | undefined;
  mustMatch?: SearchMatchType | null | undefined;
  value: string;
};

export type SearchFullTextPrefixInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  language?: string | null | undefined;
  mustMatch?: SearchMatchType | null | undefined;
  value: string;
};

export type SearchFuzzyExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  language?: string | null | undefined;
  level: number;
  mustMatch?: SearchMatchType | null | undefined;
  value: string;
};

export type SearchLongRangeExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gt?: unknown;
  gte?: unknown;
  lt?: unknown;
  lte?: unknown;
};

export type SearchMatchType =
  /** All match type. */
  | 'all'
  /** Any match type. */
  | 'any';

export type SearchNumberRangeExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
};

export type SearchQueryInput = {
  and?: Array<SearchQueryInput> | null | undefined;
  exact?: SearchAnyValueExpressionInput | null | undefined;
  exists?: SearchExistsInput | null | undefined;
  filter?: Array<SearchFilterExpressionInput> | null | undefined;
  fullText?: SearchFullTextExpressionInput | null | undefined;
  fullTextPrefix?: SearchFullTextPrefixInput | null | undefined;
  fuzzy?: SearchFuzzyExpressionInput | null | undefined;
  not?: Array<SearchQueryInput> | null | undefined;
  or?: Array<SearchQueryInput> | null | undefined;
  prefix?: SearchAnyValueExpressionInput | null | undefined;
  range?: SearchQueryRangeExpressionInput | null | undefined;
  wildcard?: SearchAnyValueExpressionInput | null | undefined;
};

export type SearchQueryRangeExpressionInput = {
  date?: SearchDateRangeExpressionInput | null | undefined;
  datetime?: SearchDateTimeRangeExpressionInput | null | undefined;
  float?: SearchNumberRangeExpressionInput | null | undefined;
  long?: SearchLongRangeExpressionInput | null | undefined;
  time?: SearchTimeRangeExpressionInput | null | undefined;
};

export type SearchSortMode =
  /** Average value. */
  | 'avg'
  /** Maximum value. */
  | 'max'
  /** Minimum value. */
  | 'min'
  /** Sum value. */
  | 'sum';

export type SearchSortOrder =
  /** Ascending order. */
  | 'asc'
  /** Descending order. */
  | 'desc';

export type SearchSortingInput = {
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  filter?: SearchFilterExpressionInput | null | undefined;
  language?: string | null | undefined;
  mode?: SearchSortMode | null | undefined;
  order: SearchSortOrder;
};

export type SearchTimeRangeExpressionInput = {
  boost?: number | null | undefined;
  field: string;
  fieldType?: SearchFieldType | null | undefined;
  gt?: unknown;
  gte?: unknown;
  lt?: unknown;
  lte?: unknown;
};

export type GetCatalogQueryVariables = Exact<{
  postFilter?: SearchQueryInput | null | undefined;
  sort?: Array<SearchSortingInput> | SearchSortingInput | null | undefined;
  limit?: number | null | undefined;
  offset?: number | null | undefined;
}>;


export type GetCatalogQuery = { productsSearch: { offset: number | null, limit: number | null, total: unknown, results: Array<{ product: { id: string, masterData: { current: { name: string | null, attributesRaw: Array<{ name: string, value: unknown }>, allVariants: Array<{ images: Array<{ url: string }>, prices: Array<{ value:
                  | { centAmount: unknown }
                  | { centAmount: unknown }
                 }> | null }> } | null } } }> } | null };

export type GetCatalogFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCatalogFiltersQuery = { productType: { id: string, key: string | null, name: string, attributeDefinitions: { results: Array<{ name: string, label: string | null, type:
          | { __typename: 'EnumAttributeDefinitionType', values: { results: Array<{ key: string, label: string }> } }
          | Record<PropertyKey, never>
         }> } } | null };
