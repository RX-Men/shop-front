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
