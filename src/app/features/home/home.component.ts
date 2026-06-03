import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroComponent } from './components/hero';
import { ProductListComponent } from './components/product-list';
import { PromoSectionComponent } from './components/promo-section';

import mock from './mock/home.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [HeroComponent, ProductListComponent, PromoSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly hero = mock.hero;
  readonly promo = mock.promo;
  readonly products = mock.products;
}
