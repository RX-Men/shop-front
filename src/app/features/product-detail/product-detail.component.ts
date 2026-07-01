import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { ButtonComponent } from '@/app/shared/components/button';
import { QuantityCounterComponent } from '@/app/shared/components/quantity-counter/quantity-counter.component';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { ProductDetailService } from '@/app/core/services/product-detail/product-detail.service';

import productDetailContent from '@/app/content/pages/product-detail/product-detail.json' with { type: 'json' };
import { ROUTES } from '@/app/core/constants/routes';

import { PricePipe } from '@/app/shared/pipes/price';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-detail',
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    PricePipe,
    QuantityCounterComponent,
    RouterLinkComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnDestroy {
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

  protected readonly _addToCart = (): void => {
    const sku = this._productDetailService.product()?.sku;

    if (!sku) {
      return;
    }

    this._productDetailService.addToCart(sku);
  };

  ngOnDestroy(): void {
    this._productDetailService.resetData();
  }
}
