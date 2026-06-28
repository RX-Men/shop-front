const CATALOG_SORT = {
  titleAsc: 'titleAsc',
  titleDesc: 'titleDesc',
  priceAsc: 'priceAsc',
  priceDesc: 'priceDesc',
  dateAsc: 'dateAsc',
  dateDesc: 'dateDesc',
};

const SORT_ORDER = {
  asc: 'asc',
  desc: 'desc',
} as const;

const CATALOG_LIMIT = {
  24: '24',
  48: '48',
  96: '96',
};

export { CATALOG_SORT, SORT_ORDER, CATALOG_LIMIT };
