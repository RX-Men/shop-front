import type { ProductCard } from './product-card.types';

const SKELETON: ProductCard = {
  id: 'product-card-skeleton-mock',
  heading: 'Alien vs. Captain America (2025) #2',
  subheading: 'Marvel',
  img: 'assets/images/portrait_uncanny.jpg',
  currentPrice: 499,
  oldPrice: 499,
  discount: 0,
  count: 1,
  sku: 'marvel-alien-vs-captain-america-2025-2',
};

export const generateProductCardSkeleton = (count: number): ProductCard[] => {
  const { id } = SKELETON;

  return Array.from({ length: count }, (_, index) => ({ ...SKELETON, id: `${id}-${index}` }));
};
