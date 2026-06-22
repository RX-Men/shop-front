import { InjectionToken } from '@angular/core';

import type { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/ts-client';

export interface CommercetoolsConfig {
  projectKey: AuthMiddlewareOptions['projectKey'];
  clientId: NonNullable<AuthMiddlewareOptions['credentials']>['clientId'];
  clientSecret: NonNullable<AuthMiddlewareOptions['credentials']>['clientSecret'];
  authUrl: AuthMiddlewareOptions['host'];
  apiUrl: HttpMiddlewareOptions['host'];
  scopes: AuthMiddlewareOptions['scopes'];
}

const commercetoolsConfigFactory = (): CommercetoolsConfig => ({
  projectKey: import.meta.env['VITE_CTP_PROJECT_KEY'],
  clientId: import.meta.env['VITE_CTP_CLIENT_ID'],
  clientSecret: import.meta.env['VITE_CTP_CLIENT_SECRET'],
  authUrl: import.meta.env['VITE_CTP_AUTH_URL'],
  apiUrl: import.meta.env['VITE_CTP_API_URL'],
  scopes: import.meta.env['VITE_CTP_SCOPES'].split(' '),
});

export const COMMERCETOOLS_CONFIG = new InjectionToken<CommercetoolsConfig>(
  'COMMERCETOOLS_CONFIG',
  { factory: commercetoolsConfigFactory },
);

export { commercetoolsConfigFactory };
