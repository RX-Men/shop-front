import { Injectable } from '@angular/core';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { type ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

@Injectable({
  providedIn: 'root',
})
export class CommercetoolsService {
  apiRoot!: ApiRoot;

  constructor() {
    this._initClient();
  }

  private readonly _initClient = (): void => {
    const projectKey = import.meta.env['VITE_CTP_PROJECT_KEY'];

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: import.meta.env['VITE_CTP_AUTH_URL'],
      projectKey,
      credentials: {
        clientId: import.meta.env['VITE_CTP_CLIENT_ID'],
        clientSecret: import.meta.env['VITE_CTP_CLIENT_SECRET'],
      },
      scopes: import.meta.env['VITE_CTP_SCOPES'].split(' '),
      httpClient: fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: import.meta.env['VITE_CTP_API_URL'],
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
