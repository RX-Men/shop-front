import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { HeroComponent } from './components/hero';
import { ProductListComponent } from './components/product-list';
import { PromoSectionComponent } from './components/promo-section';

import { HomeService } from '@/app/core/services/home';

import homeContent from '@/app/content/pages/home/home.json' with { type: 'json' };

import { shuffle } from '@/app/shared/utils/shuffle';
import { generateProductCardSkeleton } from '@/app/shared/components/product-card';

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
  protected readonly _content = homeContent;

  protected readonly _newProducts = signal<ProductCard[]>([]);
  protected readonly _trendingProducts = signal<ProductCard[]>([]);

  protected readonly _productsSkeleton = computed(() => generateProductCardSkeleton(15));

  protected readonly _isPageLoading = signal<boolean>(true);

  private readonly _fetchProducts = async (): Promise<void> => {
    this._isPageLoading.set(true);

    try {
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
    } finally {
      this._isPageLoading.set(false);
    }
  };

  ngOnInit(): void {
    this._fetchProducts();
  }
}
