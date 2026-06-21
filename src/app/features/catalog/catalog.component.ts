import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CatalogFiltersComponent } from './components/catalog-filters';
import { CatalogGridComponent } from './components/catalog-grid';
import { CatalogToolbarComponent } from './components/catalog-toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog',
  imports: [CatalogFiltersComponent, CatalogGridComponent, CatalogToolbarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {}
