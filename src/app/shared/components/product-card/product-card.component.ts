import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../button';
import { PriceComponent } from '../price';
import { ProductBadgeComponent } from './components/product-badge';
import { SkeletonComponent, type SkeletonTheme } from '../skeleton';

import { getBadgeLabel } from './product-card.utils';

import { PRODUCT_CARD_ORIENTATION } from './product-card.constants';

import productCardContent from '@/app/content/shared/product-card/product-card.json' with { type: 'json' };

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { ProductCard, ProductCardOrientation } from './product-card.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-card',
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    PriceComponent,
    ProductBadgeComponent,
    RouterLink,
    SkeletonComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly id = input.required<ProductCard['id']>();
  readonly orientation = input<ProductCardOrientation>(PRODUCT_CARD_ORIENTATION.vertical);
  readonly heading = input.required<ProductCard['heading']>();
  readonly subheading = input.required<ProductCard['subheading']>();
  readonly img = input.required<ProductCard['img']>();
  readonly currentPrice = input.required<ProductCard['currentPrice']>();
  readonly oldPrice = input.required<ProductCard['oldPrice']>();
  readonly discount = input.required<ProductCard['discount']>();
  readonly count = input.required<ProductCard['count']>();
  readonly detailsLink = input.required<string>();
  readonly sku = input.required<ProductCard['sku']>();
  readonly tabIndex = input<number>();
  readonly inCart = input<boolean>(false);

  readonly loading = input<boolean>();
  readonly skeletonTheme = input<SkeletonTheme>('dark');

  protected readonly _testIds = APP_TEST_IDS.productCard;
  protected readonly _content = productCardContent;

  protected readonly _badge = computed(() => getBadgeLabel(this.count(), this.discount()));
  protected readonly _isOut = computed(() => this.count() <= 0);
  readonly addToCart = output<string>();
}
