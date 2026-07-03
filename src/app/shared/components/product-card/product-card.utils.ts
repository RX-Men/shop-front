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
