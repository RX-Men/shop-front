import { CartService } from '@/app/core/services/cart.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { CarouselComponent } from '@/app/shared/components/carousel';
import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { ProductCardComponent } from '@/app/shared/components/product-card';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { getCardsCountByScreenSize, SCREEN_SIZE_ORDER_ASC } from './product-list.utils';

import productListContent from '@/app/content/shared/product-list/product-list.json' with { type: 'json' };

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { ROUTES } from '@/app/core/constants/routes';

import type { ProductCard } from '@/app/shared/components/product-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-list',
  imports: [CarouselComponent, IconButtonComponent, ProductCardComponent, RouterLinkComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  readonly cartService = inject(CartService);
  readonly title = input.required<string>();
  readonly products = input.required<ProductCard[]>();
  readonly loading = input<boolean>();

  protected readonly _carouselEl = viewChild.required(CarouselComponent);
  protected readonly _perViewCardsCount = signal<number>(5);

  protected readonly _testIds = APP_TEST_IDS.productList;
  protected readonly _routes = ROUTES;
  protected readonly _content = productListContent;

  private readonly _breakpointObserver = inject(BreakpointObserver);
  private _breakpointSubscription: Subscription | null = null;

  ngOnInit(): void {
    this._breakpointSubscription = this._breakpointObserver
      .observe(SCREEN_SIZE_ORDER_ASC)
      .subscribe(({ breakpoints }) => {
        this._perViewCardsCount.set(getCardsCountByScreenSize(breakpoints));
      });
  }

  ngOnDestroy(): void {
    if (this._breakpointSubscription) {
      this._breakpointSubscription.unsubscribe();
    }
  }

  handleAddToCart(sku: string): void {
    this.cartService.addLineItem(sku);
  }
}
