import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import headerContent from '@/app/content/layout/header/header.json' with { type: 'json' };

import { IconRouterLinkComponent } from '@/app/shared/components/icon-router-link';

import { ROUTES } from '@/app/core/constants/routes';

import { getBadgeContent } from './cart-button.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-button',
  imports: [IconRouterLinkComponent],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent {
  readonly productsCount = input<number>();

  protected readonly _badge = computed(() => getBadgeContent(this.productsCount()));

  protected readonly _data = headerContent.cartButton;
  protected readonly _routes = ROUTES;
}
