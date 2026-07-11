import { CART_PROVIDER } from '@/app/core/providers/cart-provider';
import { LocalStorageService } from '@/app/core/services/local-storage.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';

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
      const { body } = await this._cartProvider.getActiveCart();
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
      const { body } = await this._cartProvider.createCart([{ sku, quantity }]);
      this._saveCart(body);
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

  private _buildLineItems(
    cart: Cart,
    actions: MyCartUpdateAction[],
  ): { sku: string; quantity: number }[] {
    const itemsToCreate = cart.lineItems
      .filter((item) => item.variant.sku !== undefined)
      .map((item) => ({
        sku: item.variant.sku!,
        quantity: item.quantity,
      }));

    for (const act of actions) {
      if (act.action === 'addLineItem' && act.sku) {
        itemsToCreate.push({
          sku: act.sku,
          quantity: act.quantity ?? 1,
        });
      }
    }
    return itemsToCreate;
  }

  private async _update(actions: MyCartUpdateAction[]): Promise<void> {
    const cart = this._cart();

    if (!cart) {
      return;
    }

    try {
      const { body } = await this._cartProvider.updateCart(cart.id, cart.version, actions);
      this._saveCart(body);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number };

        if ((err.status === 404 || err.status === 403) && cart.lineItems.length > 0) {
          const itemsToCreate = this._buildLineItems(cart, actions);
          const { body } = await this._cartProvider.createCart(itemsToCreate);
          this._saveCart(body);
        }
      }
    }
  }
}
