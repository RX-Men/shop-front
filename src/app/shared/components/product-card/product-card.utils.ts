export const getBadgeLabel = (productCount: number, productDiscount: number): string | null => {
  if (productCount === 0) {
    return 'Sold out';
  }

  if (productCount <= 5) {
    return `${productCount} left`;
  }

  if (productDiscount > 0) {
    return `${productDiscount}% off`;
  }

  return null;
};

export const getPriceAriaLabel = (
  currentPrice: string | null,
  oldPrice: string | null,
  withDiscount: boolean,
): string => {
  if (withDiscount && currentPrice && oldPrice) {
    return `Now is ${currentPrice}. Original price is ${oldPrice}`;
  }

  if (currentPrice) {
    return `Price is ${currentPrice}`;
  }

  return 'Product is unavailable at the moment';
};
