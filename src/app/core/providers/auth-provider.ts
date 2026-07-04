import { InjectionToken } from '@angular/core';

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export interface AuthProvider {
  project(): ByProjectKeyRequestBuilder;

  initPasswordClient(email: string, password: string): void;

  initAnonymousClient(anonymousId: string): void;

  initRefreshTokenClient(refreshToken: string): void;
}

export const AUTH_PROVIDER = new InjectionToken<AuthProvider>('AUTH_PROVIDER');
