import { computed, inject, Injectable, signal } from '@angular/core';
import { print } from 'graphql';

import { COMMERCETOOLS_CONFIG } from '../commercetools/commercetools.config';
import { CommercetoolsService } from '../commercetools';

import ProductDetailAdapter from './product-detail.adapter';

import { GET_PRODUCT_DETAIL } from './graphql/get-product-detail';

import { DEFAULT_TO_CART_QUANTITY } from './product-detail.constants';

import type { ProductDetail, ProductDetailState } from './product-detail.types';
import type { GetProductDetailQuery } from '../../graphql/generated.types';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private readonly _commercetoolsService = inject(CommercetoolsService);
  private readonly _ctpConfig = inject(COMMERCETOOLS_CONFIG);

  private readonly _state = signal<ProductDetailState>({
    data: {
      product: null,
      quantity: DEFAULT_TO_CART_QUANTITY,
    },
  });

  readonly product = computed(() => this._state().data.product);
  readonly quantity = computed(() => this._state().data.quantity);

  changeQuantity(quantity: number): void {
    this._state.update((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        quantity,
      },
    }));
  }

  addToCart(sku: ProductDetail['sku']): void {
    console.debug(`Add to cart: sku - ${sku}, quantity - ${this.quantity()}`);
  }

  resetData(): void {
    this._state.update((prevState) => ({
      ...prevState,
      data: {
        product: null,
        quantity: DEFAULT_TO_CART_QUANTITY,
      },
    }));
  }

  async fetchProduct(productId: string): Promise<void> {
    const { projectKey } = this._ctpConfig;

    try {
      const queryText = print(GET_PRODUCT_DETAIL);
      const response = await this._commercetoolsService.apiRoot
        .withProjectKey({ projectKey })
        .graphql()
        .post({
          body: {
            query: queryText,
            operationName: 'GetProductDetail',
            variables: {
              productId,
            },
          },
        })
        .execute();

      const rawDto = response.body.data;
      if (!rawDto) {
        throw new Error('Commercetools GraphQL response returned empty data');
      }

      const data = ProductDetailAdapter.toFrontendProductDetail(rawDto as GetProductDetailQuery);
      this._state.update((prevState) => ({
        ...prevState,
        data: {
          product: data,
          quantity: DEFAULT_TO_CART_QUANTITY,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
