import { CartService } from '@/app/core/services/cart.service';

import { EmptyComponent } from '@/app/shared/components/empty';
import { type ProductCard, ProductCardComponent } from '@/app/shared/components/product-card';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-grid',
  imports: [EmptyComponent, ProductCardComponent],
  templateUrl: './catalog-grid.component.html',
  styleUrl: './catalog-grid.component.scss',
})
export class CatalogGridComponent {
  readonly cartService = inject(CartService);
  readonly products = input.required<ProductCard[]>();
  readonly loading = input<boolean>();

  protected readonly _content = catalogContent.grid;

  handleAddToCart(sku: string): void {
    this.cartService.addLineItem(sku);
  }
}
