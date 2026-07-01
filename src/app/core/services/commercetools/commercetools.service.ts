import { LocalStorageService } from '@/app/core/services/local-storage.service';
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
  private readonly _storage = inject(LocalStorageService);

  constructor() {
    console.log('CommercetoolsService created');
    this._initClient();
  }

  private readonly _initClient = (): void => {
    const { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes } = this._config;
    const anonymousId = this._storage.getItem<string>('anonymousId') ?? crypto.randomUUID();
    this._storage.setItem('anonymousId', anonymousId);

    console.log('anonymousId:', anonymousId);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        anonymousId,
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
      //TODO auth token
      // .withClientCredentialsFlow(authMiddlewareOptions)
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(client);
  };
}
