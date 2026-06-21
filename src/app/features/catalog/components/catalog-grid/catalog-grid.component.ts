import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type ProductCard, ProductCardComponent } from '@/app/shared/components/product-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-grid',
  imports: [ProductCardComponent],
  templateUrl: './catalog-grid.component.html',
  styleUrl: './catalog-grid.component.scss',
})
export class CatalogGridComponent {
  readonly products = input.required<ProductCard[]>();
}
