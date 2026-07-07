import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EmptyComponent } from '@/app/shared/components/empty';
import { type ProductCard, ProductCardComponent } from '@/app/shared/components/product-card';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-grid',
  imports: [EmptyComponent, ProductCardComponent],
  templateUrl: './catalog-grid.component.html',
  styleUrl: './catalog-grid.component.scss',
})
export class CatalogGridComponent {
  readonly products = input.required<ProductCard[]>();
  readonly loading = input<boolean>();

  protected readonly _content = catalogContent.grid;
}
