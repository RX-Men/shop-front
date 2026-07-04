import { InjectionToken } from '@angular/core';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export interface CartProvider {
  project(): ByProjectKeyRequestBuilder;
}

export const CART_PROVIDER = new InjectionToken<CartProvider>('CART_PROVIDER');
