interface ProductDetail {
  id: string | null;
  heading: string | null;
  subheading: string | null;
  genre: string | null;
  description: string | null;
  writer: string | null;
  penciller: string | null;
  coverArtist: string | null;
  img: string | null;
  currentPrice: number | null;
  oldPrice: number | null;
  discount: number | null;
  count: number;
  pageCount: number | null;
  sku: string | null;
  releaseDate: string | null;
}

interface ProductDetailState {
  data: {
    product: ProductDetail | null;
    quantity: number;
  };
}

export type { ProductDetail, ProductDetailState };
