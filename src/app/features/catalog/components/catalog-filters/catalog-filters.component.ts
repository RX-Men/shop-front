import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-filters',
  imports: [],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.scss',
})
export class CatalogFiltersComponent {}
