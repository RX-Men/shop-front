import type { AuthProvider } from '@/app/core/providers/auth-provider';
import type { CartProvider } from '@/app/core/providers/cart-provider';
import { NotificationService } from '@/app/core/services/notification';
import type { CustomerTokenData, FlowOptionsMap, Settings } from './commercetools.types';
import { LocalStorageService, type StorageKey } from '@/app/core/services/local-storage.service';
import { inject, Injectable } from '@angular/core';
import {
  type ApiRoot,
  type ByProjectKeyRequestBuilder,
  type Cart,
  createApiBuilderFromCtpClient,
  type Customer,
  type MyCartUpdateAction,
  type MyCustomerDraft,
  type MyCustomerSignin,
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
  private readonly _httpClient = fetch;

  private readonly _tokenCache = this._createTokenCache('customerToken');
  private readonly _anonymousTokenCache = this._createTokenCache('anonymousId');

  private _createTokenCache(key: StorageKey): TokenCache {
    return {
      get: async () => this._storage.getItem(key) ?? undefined,
      set: async (cache) => this._storage.setItem(key, cache),
    };
  }

  private _bootstrapClient(): void {
    const customerToken = this._storage.getItem<CustomerTokenData>('customerToken');

    if (customerToken?.refreshToken) {
      this.initRefreshTokenClient(customerToken.refreshToken);
      return;
    }

    const anonymousId = this._storage.getItem<string>('anonymousId') ?? crypto.randomUUID();
    this._storage.setItem('anonymousId', anonymousId);
    this.initAnonymousClient(anonymousId);
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
      httpClient: this._httpClient,
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
      httpClient: this._httpClient,
    };

    this._setApiRoot(authOptions, 'password');
  }

  async getActiveCart(): Promise<{ body: Cart }> {
    return this.project().me().activeCart().get().execute();
  }

  async createCart(lineItems: { sku: string; quantity: number }[]): Promise<{ body: Cart }> {
    return this.project()
      .me()
      .carts()
      .post({ body: { currency: 'USD', lineItems } })
      .execute();
  }

  async updateCart(
    cartId: string,
    version: number,
    actions: MyCartUpdateAction[],
  ): Promise<{ body: Cart }> {
    return this.project()
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: { version, actions } })
      .execute();
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
      httpClient: this._httpClient,
    };

    this._setApiRoot(authOptions, 'refresh');
  }

  private _setApiRoot<K extends keyof FlowOptionsMap>(
    authOptions: FlowOptionsMap[K],
    flow: K,
  ): void {
    const httpOptions: HttpMiddlewareOptions = {
      host: this._config.apiUrl,
      httpClient: this._httpClient,
    };

    const client = this._settings[flow](authOptions)
      .withHttpMiddleware(httpOptions)
      .withMiddleware(delayAndErrorMiddleware(this._notification))
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(client);
  }
  login(
    email: string,
    password: string,
    anonymousCartId?: string,
    anonymousCartSignInMode?: 'MergeWithExistingCustomerCart',
  ): Promise<{ body: { customer: Customer; cart?: Cart } }> {
    return this.project()
      .me()
      .login()
      .post({
        body: {
          email,
          password,
          anonymousCartId,
          anonymousCartSignInMode,
        } as MyCustomerSignin,
      })
      .execute();
  }

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    anonymousCartId?: string,
    anonymousCartSignInMode?: 'MergeWithExistingCustomerCart',
  ): Promise<{ body: { customer: Customer; cart?: Cart } }> {
    return this.project()
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
          firstName,
          lastName,
          anonymousCartId,
          anonymousCartSignInMode,
        } as MyCustomerDraft,
      })
      .execute();
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
