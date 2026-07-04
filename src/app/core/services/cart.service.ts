import { CART_PROVIDER } from '@/app/core/providers/cart-provider';
import { LocalStorageService } from '@/app/core/services/local-storage.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import type {
  ByProjectKeyRequestBuilder,
  Cart,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _cartProvider = inject(CART_PROVIDER);
  private readonly _storage = inject(LocalStorageService);
  private readonly _cart = signal<Cart | null>(this._storage.getItem<Cart>('cachedCart'));

  readonly cart = this._cart.asReadonly();
  readonly items = computed(() => this._cart()?.lineItems ?? []);
  readonly itemsCount = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly totalCentAmount = computed(() => this._cart()?.totalPrice.centAmount ?? 0);

  constructor() {
    this.loadCart();
  }

  setCart(cart: Cart): void {
    this._saveCart(cart);
  }

  clearLocalCart(): void {
    this._cart.set(null);
    this._storage.removeItem('cachedCart');
  }

  private _saveCart(body: Cart): void {
    this._cart.set(body);
    this._storage.setItem('cachedCart', body);
  }

  async loadCart(): Promise<void> {
    try {
      const { body } = await this._project().me().activeCart().get().execute();

      this._saveCart(body);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number };

        if (err.status === 404) {
          console.log("The active cart hasn't been created on the server yet.");
        } else {
          console.error('Error loading cart:', err);
        }
      }
    }
  }

  async addLineItem(sku: string, quantity = 1): Promise<void> {
    const cart = this._cart();

    if (!cart) {
      await this._createCart([{ sku, quantity }]);
      return;
    }

    await this._update([{ action: 'addLineItem', sku, quantity }]);
  }

  async changeQuantity(lineItemId: string, quantity: number): Promise<void> {
    await this._update([{ action: 'changeLineItemQuantity', lineItemId, quantity }]);
  }

  async removeLineItem(lineItemId: string): Promise<void> {
    await this._update([{ action: 'removeLineItem', lineItemId }]);
  }
  private async _updateCart(cart: Cart, actions: MyCartUpdateAction[]): Promise<void> {
    const { body } = await this._project()
      .me()
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions,
        },
      })
      .execute();

    this._saveCart(body);
  }
  private _buildLineItems(
    cart: Cart,
    actions: MyCartUpdateAction[],
  ): { sku: string | undefined; quantity: number }[] {
    const itemsToCreate = cart.lineItems.map((item) => ({
      sku: item.variant.sku,
      quantity: item.quantity,
    }));

    for (const act of actions) {
      if (act.action === 'addLineItem') {
        itemsToCreate.push({
          sku: act.sku,
          quantity: act.quantity ?? 1,
        });
      }
    }
    return itemsToCreate;
  }

  private async _createCart(
    lineItems: { sku: string | undefined; quantity: number }[],
  ): Promise<void> {
    const { body } = await this._project()
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          lineItems: lineItems,
        },
      })
      .execute();

    this._saveCart(body);
  }
  private async _update(actions: MyCartUpdateAction[]): Promise<void> {
    const cart = this._cart();

    if (!cart) {
      return;
    }
    try {
      await this._updateCart(cart, actions);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number };

        if ((err.status === 404 || err.status === 403) && cart.lineItems.length > 0) {
          const itemsToCreate = this._buildLineItems(cart, actions);
          await this._createCart(itemsToCreate);
        }
      }
    }
  }

  private _project(): ByProjectKeyRequestBuilder {
    return this._cartProvider.project();
  }
}
