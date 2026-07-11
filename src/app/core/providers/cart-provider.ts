import { InjectionToken } from '@angular/core';

import type {
  ByProjectKeyRequestBuilder,
  Cart,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';

export interface CartProvider {
  project(): ByProjectKeyRequestBuilder;

  getActiveCart(): Promise<{ body: Cart }>;

  createCart(lineItems: { sku: string; quantity: number }[]): Promise<{ body: Cart }>;

  updateCart(
    cartId: string,
    version: number,
    actions: MyCartUpdateAction[],
  ): Promise<{ body: Cart }>;
}

export const CART_PROVIDER = new InjectionToken<CartProvider>('CART_PROVIDER');
