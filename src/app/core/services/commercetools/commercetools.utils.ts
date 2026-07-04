import type {
  AuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/ts-client';

export interface FlowOptionsMap {
  anonymous: AuthMiddlewareOptions;
  password: PasswordAuthMiddlewareOptions;
  refresh: RefreshAuthMiddlewareOptions;
}

export type Settings = {
  [K in keyof FlowOptionsMap]: (options: FlowOptionsMap[K]) => ClientBuilder;
};
