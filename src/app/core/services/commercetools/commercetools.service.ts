import { inject, Injectable } from '@angular/core';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { type ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { COMMERCETOOLS_CONFIG } from './commercetools.config';

@Injectable({
  providedIn: 'root',
})
export class CommercetoolsService {
  apiRoot!: ApiRoot;

  private readonly _config = inject(COMMERCETOOLS_CONFIG);

  constructor() {
    this._initClient();
  }

  private readonly _initClient = (): void => {
    const { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes } = this._config;

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      httpClient: fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: apiUrl,
      httpClient: fetch,
    };

    const client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(client);
  };
}
