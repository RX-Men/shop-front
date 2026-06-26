import { Injectable, signal } from '@angular/core';
import type { Cart, LineItem } from '@commercetools/platform-sdk';

@Injectable()
export class MockCartService {
  private readonly _cart = signal<Cart>({
    id: 'cart-1',
    version: 1,
    lineItems: [
      {
        id: 'item-1',
        quantity: 2,
        name: {
          'en-US': 'Batman #1',
        },
        variant: {
          sku: 'batman-1',
          images: [
            {
              url: 'assets/images/portrait_uncanny.jpg',
            },
          ],
        },
        totalPrice: {
          centAmount: 998,
        },
      },
      {
        id: 'item-2',
        quantity: 1,
        name: {
          'en-US': 'Spider-Man #5',
        },
        variant: {
          sku: 'spiderman-5',
          images: [
            {
              url: 'assets/images/portrait_uncanny.jpg',
            },
          ],
        },
        totalPrice: {
          centAmount: 499,
        },
      },
    ],
    totalPrice: {
      centAmount: 1497,
    },
  } as unknown as Cart);

  readonly cart = this._cart.asReadonly();

  readonly items = (): LineItem[] => this._cart().lineItems;

  readonly itemsCount = (): number =>
    this._cart().lineItems.reduce((sum, item) => sum + item.quantity, 0);

  readonly totalCentAmount = (): number => this._cart().totalPrice.centAmount;

  changeQuantity(): void {
    return;
  }

  removeLineItem(): void {
    return;
  }
}
