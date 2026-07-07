import { inject, Injectable } from '@angular/core';
import { print } from 'graphql';

import { COMMERCETOOLS_CONFIG } from '../commercetools/commercetools.config';
import { CommercetoolsService } from '../commercetools';

import { GET_NEW_PRODUCTS } from './graphql/get-new-products';
import { GET_TRENDING_PRODUCTS } from './graphql/get-trending-products';

import HomeAdapter from './home.adapter';

import homeStaticContent from '@/app/content/pages/home/home.json' with { type: 'json' };

import type { GetNewProductsQuery, GetTrendingProductsQuery } from '../../graphql/generated.types';
import type { ProductCard } from '@/app/shared/components/product-card';
import type { HeroCarouselBanner } from '@/app/features/home/components/hero/hero.types';
import type { Promo } from './home.types';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly _commercetoolsService = inject(CommercetoolsService);
  private readonly _ctpConfig = inject(COMMERCETOOLS_CONFIG);

  getHero(): HeroCarouselBanner[] {
    return homeStaticContent.hero;
  }

  getPromo(): Promo {
    return homeStaticContent.promo;
  }

  async fetchNewProducts(limit = 15): Promise<ProductCard[]> {
    const { projectKey } = this._ctpConfig;
    const queryText = print(GET_NEW_PRODUCTS);

    try {
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetNewProducts',
            variables: {
              limit,
            },
          },
        })
        .execute();

      const rawDto = response.body.data;
      if (!rawDto) {
        throw new Error('Commercetools GraphQL response returned empty data');
      }

      return HomeAdapter.toFrontendNewProducts(rawDto as GetNewProductsQuery);
    } catch {
      return [];
    }
  }

  async fetchTrendingProducts(): Promise<ProductCard[]> {
    const { projectKey } = this._ctpConfig;
    const queryText = print(GET_TRENDING_PRODUCTS);

    try {
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetTrendingProducts',
          },
        })
        .execute();

      const rawDto = response.body.data;
      if (!rawDto) {
        throw new Error('Commercetools GraphQL response returned empty data');
      }

      return HomeAdapter.toFrontendTrendingProducts(rawDto as GetTrendingProductsQuery);
    } catch {
      return [];
    }
  }
}
