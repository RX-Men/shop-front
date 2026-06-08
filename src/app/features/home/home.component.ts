import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProductsService } from '@/app/core/services/products.service';
import { HeroComponent } from './components/hero';
import { ProductListComponent } from './components/product-list';
import { PromoSectionComponent } from './components/promo-section';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [HeroComponent, ProductListComponent, PromoSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _productsService = inject(ProductsService);

  readonly hero = this._productsService.getHomeHero();
  readonly promo = this._productsService.getHomePromo();
  readonly products = this._productsService.getHomeProducts();
}
