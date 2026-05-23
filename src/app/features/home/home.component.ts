import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductListComponent } from './components/product-list';

import { PRODUCTS_MOCK } from './mock/products-mock';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly products = PRODUCTS_MOCK;
}
