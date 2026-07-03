import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { HeroComponent } from './components/hero';
import { ProductListComponent } from './components/product-list';
import { PromoSectionComponent } from './components/promo-section';

import { HomeService } from '@/app/core/services/home';

import { shuffle } from '@/app/shared/utils/shuffle';

import type { ProductCard } from '@/app/shared/components/product-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [HeroComponent, ProductListComponent, PromoSectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly _homeService = inject(HomeService);

  protected readonly _hero = this._homeService.getHero();
  protected readonly _promo = this._homeService.getPromo();

  protected readonly _newProducts = signal<ProductCard[]>([]);
  protected readonly _trendingProducts = signal<ProductCard[]>([]);

  private readonly _fetchProducts = async (): Promise<void> => {
    const [newProducts, trendingProducts] = await Promise.allSettled([
      this._homeService.fetchNewProducts(),
      this._homeService.fetchTrendingProducts(),
    ]);

    if (newProducts.status === 'fulfilled') {
      this._newProducts.set(shuffle(newProducts.value));
    }

    if (trendingProducts.status === 'fulfilled') {
      this._trendingProducts.set(shuffle(trendingProducts.value));
    }
  };

  ngOnInit(): void {
    this._fetchProducts();
  }
}
