import { Injectable } from '@angular/core';

import productsMock from '@/app/core/mocks/products.json' with { type: 'json' };

import type { ProductCard } from '@/app/shared/components/product-card';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly _products = productsMock;

  readonly getProducts = (): ProductCard[] => {
    return this._products;
  };

  readonly getProductsCount = (): number => {
    return this._products.length;
  };
}
