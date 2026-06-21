import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CatalogFiltersComponent } from './components/catalog-filters';
import { CatalogGridComponent } from './components/catalog-grid';
import { CatalogToolbarComponent } from './components/catalog-toolbar';

import { CatalogService } from '@/app/core/services/catalog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog',
  imports: [CatalogFiltersComponent, CatalogGridComponent, CatalogToolbarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  protected readonly _catalogService = inject(CatalogService);
}
