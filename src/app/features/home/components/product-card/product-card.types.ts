interface ProductCard {
  id: string;
  heading: string;
  subheading: string;
  img: string;
  currentPrice: number;
  oldPrice: number;
  discount: number;
  count: number;
}

export type { ProductCard };
