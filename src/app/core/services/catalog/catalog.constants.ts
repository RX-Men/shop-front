const CATALOG_SORT = {
  titleAsc: 'titleAsc',
  titleDesc: 'titleDesc',
  priceAsc: 'priceAsc',
  priceDesc: 'priceDesc',
  dateAsc: 'dateAsc',
  dateDesc: 'dateDesc',
} as const;

const SORT_ORDER = {
  asc: 'asc',
  desc: 'desc',
} as const;

const CATALOG_LIMIT = {
  24: '24',
  48: '48',
  96: '96',
} as const;

const DEFAULT_CATALOG_LIMIT = CATALOG_LIMIT[24];

export { CATALOG_SORT, SORT_ORDER, CATALOG_LIMIT, DEFAULT_CATALOG_LIMIT };
