import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { PricePipe } from '@/app/shared/pipes/price';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { LineItem } from '@commercetools/platform-sdk';
import { QuantityCounterComponent } from '@/app/shared/components/quantity-counter/quantity-counter.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-item',
  imports: [NgOptimizedImage, PricePipe, QuantityCounterComponent, IconButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  readonly item = input.required<LineItem>();
  readonly quantityChange = output<number>();
  readonly remove = output<void>();
  readonly disabled = input<boolean>(false);
}
