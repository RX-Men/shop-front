import { InjectionToken } from '@angular/core';

import type { ByProjectKeyRequestBuilder, Cart, Customer } from '@commercetools/platform-sdk';

export interface AuthProvider {
  project(): ByProjectKeyRequestBuilder;

  initPasswordClient(email: string, password: string): void;

  initAnonymousClient(anonymousId: string): void;

  initRefreshTokenClient(refreshToken: string): void;

  login(
    email: string,
    password: string,
    anonymousCartId?: string,
    anonymousCartSignInMode?: 'MergeWithExistingCustomerCart',
  ): Promise<{ body: { customer: Customer; cart?: Cart } }>;

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    anonymousCartId?: string,
    anonymousCartSignInMode?: 'MergeWithExistingCustomerCart',
  ): Promise<{ body: { customer: Customer; cart?: Cart } }>;
}

export const AUTH_PROVIDER = new InjectionToken<AuthProvider>('AUTH_PROVIDER');
