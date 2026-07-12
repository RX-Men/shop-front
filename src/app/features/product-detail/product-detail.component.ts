import { CartService } from '@/app/core/services/cart.service';
import { EmptyComponent } from '@/app/shared/components/empty';
import { SkeletonComponent } from '@/app/shared/components/skeleton';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { ButtonComponent } from '@/app/shared/components/button';
import { PriceComponent } from '@/app/shared/components/price';
import { QuantityCounterComponent } from '@/app/shared/components/quantity-counter/quantity-counter.component';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { ProductDetailService } from '@/app/core/services/product-detail/product-detail.service';

import productDetailContent from '@/app/content/pages/product-detail/product-detail.json' with { type: 'json' };
import { ROUTES } from '@/app/core/constants/routes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-detail',
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    PriceComponent,
    QuantityCounterComponent,
    RouterLinkComponent,
    EmptyComponent,
    SkeletonComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnDestroy {
  protected readonly _cartService = inject(CartService);
  readonly productId = input.required<string>();

  protected readonly _routes = ROUTES;
  protected readonly _content = productDetailContent;
  protected readonly _attributes: (keyof typeof this._content.attributes)[] = [
    'genre',
    'writer',
    'penciller',
    'coverArtist',
    'pageCount',
    'releaseDate',
  ];

  protected readonly _productDetailService = inject(ProductDetailService);

  constructor() {
    effect(() => {
      const productId = this.productId();
      this._productDetailService.fetchProduct(productId);
    });
  }

  protected readonly _isCartButtonDisabled = computed((): boolean => {
    const product = this._productDetailService.product();
    if (!product?.sku) {
      return true;
    }

    return product.count <= 0 || this._cartService.isInCart(product.sku);
  });

  protected readonly _addToCart = async (): Promise<void> => {
    const product = this._productDetailService.product();

    if (!product?.sku || this._cartService.isInCart(product.sku)) {
      return;
    }

    await this._cartService.addLineItem(product.sku, this._productDetailService.quantity());
  };
  protected readonly _isInCart = computed(() => {
    const sku = this._productDetailService.product()?.sku;

    return sku ? this._cartService.isInCart(sku) : false;
  });

  ngOnDestroy(): void {
    this._productDetailService.resetData();
  }
}
