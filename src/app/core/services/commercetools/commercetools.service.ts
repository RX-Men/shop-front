import type { AuthProvider } from '@/app/core/providers/auth-provider';
import type { CartProvider } from '@/app/core/providers/cart-provider';
import { NotificationService } from '@/app/core/services/notification';
import type {
  BootstrapStrategy,
  CustomerTokenData,
  FlowOptionsMap,
  Settings,
} from './commercetools.types';
import { LocalStorageService } from '@/app/core/services/local-storage.service';
import { inject, Injectable } from '@angular/core';
import {
  type ApiRoot,
  type ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  type TokenCache,
} from '@commercetools/ts-client';

import { delayAndErrorMiddleware } from './middlewares/delay-and-error';
import { COMMERCETOOLS_CONFIG } from './commercetools.config';

@Injectable({ providedIn: 'root' })
export class CommercetoolsService implements AuthProvider, CartProvider {
  apiRoot!: ApiRoot;

  private readonly _config = inject(COMMERCETOOLS_CONFIG);
  private readonly _storage = inject(LocalStorageService);
  private readonly _notification = inject(NotificationService);

  private readonly _tokenCache: TokenCache = {
    get: async () => this._storage.getItem('customerToken') ?? undefined,
    set: async (cache) => this._storage.setItem('customerToken', cache),
  };
  private readonly _anonymousTokenCache: TokenCache = {
    get: async () => this._storage.getItem('anonymousId') ?? undefined,
    set: async (cache) => this._storage.setItem('anonymousId', cache),
  };

  private _bootstrapClient(): void {
    const strategies: BootstrapStrategy[] = [
      {
        matches: (): boolean => {
          const customerToken = this._storage.getItem<CustomerTokenData>('customerToken');

          return !!customerToken?.refreshToken;
        },

        bootstrap: (): void => {
          const customerToken = this._storage.getItem<CustomerTokenData>('customerToken')!;

          this.initRefreshTokenClient(customerToken.refreshToken);
        },
      },
      {
        matches: (): boolean => true,

        bootstrap: (): void => {
          const anonymousId = this._storage.getItem<string>('anonymousId') ?? crypto.randomUUID();

          this._storage.setItem('anonymousId', anonymousId);

          this.initAnonymousClient(anonymousId);
        },
      },
    ];

    strategies.find((strategy) => strategy.matches())?.bootstrap();
  }
  constructor() {
    this._bootstrapClient();
  }

  project(): ByProjectKeyRequestBuilder {
    return this.apiRoot.withProjectKey({
      projectKey: this._config.projectKey,
    });
  }

  initAnonymousClient(anonymousId: string): void {
    const authOptions: AuthMiddlewareOptions = {
      host: this._config.authUrl,
      projectKey: this._config.projectKey,
      tokenCache: this._anonymousTokenCache,
      credentials: {
        clientId: this._config.clientId,
        clientSecret: this._config.clientSecret,
        anonymousId,
      },
      scopes: this._config.scopes,
      httpClient: fetch,
    };

    this._setApiRoot(authOptions, 'anonymous');
  }

  initPasswordClient(email: string, password: string): void {
    const authOptions: PasswordAuthMiddlewareOptions = {
      host: this._config.authUrl,
      projectKey: this._config.projectKey,
      credentials: {
        clientId: this._config.clientId,
        clientSecret: this._config.clientSecret,
        user: {
          username: email,
          password,
        },
      },
      scopes: this._config.scopes,
      tokenCache: this._tokenCache,
      httpClient: fetch,
    };

    this._setApiRoot(authOptions, 'password');
  }

  initRefreshTokenClient(refreshToken: string): void {
    const authOptions: RefreshAuthMiddlewareOptions = {
      host: this._config.authUrl,
      projectKey: this._config.projectKey,
      credentials: {
        clientId: this._config.clientId,
        clientSecret: this._config.clientSecret,
      },
      refreshToken,
      tokenCache: this._tokenCache,
      httpClient: fetch,
    };

    this._setApiRoot(authOptions, 'refresh');
  }

  private _setApiRoot<K extends keyof FlowOptionsMap>(
    authOptions: FlowOptionsMap[K],
    flow: K,
  ): void {
    const httpOptions: HttpMiddlewareOptions = {
      host: this._config.apiUrl,
      httpClient: fetch,
    };

    const client = this._settings[flow](authOptions)
      .withHttpMiddleware(httpOptions)
      .withMiddleware(delayAndErrorMiddleware(this._notification))
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(client);
  }
  private readonly _settings: Settings = {
    anonymous: (options) =>
      new ClientBuilder().withProjectKey(this._config.projectKey).withAnonymousSessionFlow(options),

    password: (options) =>
      new ClientBuilder().withProjectKey(this._config.projectKey).withPasswordFlow(options),

    refresh: (options) =>
      new ClientBuilder().withProjectKey(this._config.projectKey).withRefreshTokenFlow(options),
  };
}
