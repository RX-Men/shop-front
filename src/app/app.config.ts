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
  ],
};
