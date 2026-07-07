import { UNICODE } from '@/app/shared/constants/unicode';

const { nbsp, ndash } = UNICODE;

interface GetCatalogTotalCountLabelParams {
  page: number;
  limit: number;
  total: number;
}

export const getCatalogTotalCountLabel = ({
  page,
  limit,
  total,
}: GetCatalogTotalCountLabelParams): string => {
  if (total === 0) {
    return `0${nbsp}products`;
  }

  const from = limit * page + 1;
  const to = limit * page + limit;

  if (from === total) {
    return `${from} of${nbsp}${total}${nbsp}${total === 1 ? 'product' : 'products'}`;
  }

  if (to > total) {
    return `${from}${ndash}${total} of${nbsp}${total}${nbsp}${total === 1 ? 'product' : 'products'}`;
  }

  return `${from}${ndash}${to} of${nbsp}${total}${nbsp}${total === 1 ? 'product' : 'products'}`;
};
