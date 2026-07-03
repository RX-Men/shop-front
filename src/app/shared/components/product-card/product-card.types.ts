import { PRODUCT_CARD_ORIENTATION } from './product-card.constants';

interface ProductCard {
  id: string;
  heading: string;
  subheading: string;
  img: string;
  currentPrice: number;
  oldPrice: number;
  discount: number;
  count: number;
  sku: string | null;
}

type ProductCardOrientation =
  (typeof PRODUCT_CARD_ORIENTATION)[keyof typeof PRODUCT_CARD_ORIENTATION];

export type { ProductCard, ProductCardOrientation };
