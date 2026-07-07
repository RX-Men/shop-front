import productCardContent from '@/app/content/shared/product-card/product-card.json' with { type: 'json' };

export const getBadgeLabel = (productCount: number, productDiscount: number): string | null => {
  if (productCount === 0) {
    return productCardContent.badge.soldOut;
  }

  if (productCount <= 5) {
    return productCardContent.badge.left.replace('{count}', String(productCount));
  }

  if (productDiscount > 0) {
    return productCardContent.badge.discount.replace('{discount}', String(productDiscount));
  }

  return null;
};
