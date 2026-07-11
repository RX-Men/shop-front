import { AUTH_PROVIDER } from '@/app/core/providers/auth-provider';
import { CART_PROVIDER } from '@/app/core/providers/cart-provider';
import { CommercetoolsService } from '@/app/core/services/commercetools';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';

import {
  COMMERCETOOLS_CONFIG,
  commercetoolsConfigFactory,
} from '@/app/core/services/commercetools/commercetools.config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    { provide: COMMERCETOOLS_CONFIG, useFactory: commercetoolsConfigFactory },
    {
      provide: AUTH_PROVIDER,
      useExisting: CommercetoolsService,
    },
    {
      provide: CART_PROVIDER,
      useExisting: CommercetoolsService,
    },
  ],
};
