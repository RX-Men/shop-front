import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-grid',
  imports: [],
  templateUrl: './catalog-grid.component.html',
  styleUrl: './catalog-grid.component.scss',
})
export class CatalogGridComponent {
  readonly products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
}
