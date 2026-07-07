import priceContent from '@/app/content/shared/price/price.json' with { type: 'json' };

export const getPriceAriaLabel = (
  currentPrice: string | null,
  oldPrice: string | null,
  withDiscount: boolean,
): string => {
  if (withDiscount && currentPrice && oldPrice) {
    return priceContent.aria.discount
      .replace('{currentPrice}', currentPrice)
      .replace('{oldPrice}', oldPrice);
  }

  if (currentPrice) {
    return priceContent.aria.default.replace('{currentPrice}', currentPrice);
  }

  return priceContent.aria.unavailable;
};
