import { Injectable } from '@angular/core';

import homeContent from '@/app/features/home/mock/home.json' with { type: 'json' };

import type { HeroCarouselBanner } from '@/app/features/home/components/hero/hero.types';
import type { ProductCard } from '@/app/shared/components/product-card';

interface PromoContent {
  title: string;
  subtitle: string;
  description: string;
  img: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getHomeHero(): HeroCarouselBanner[] {
    return homeContent.hero;
  }

  getHomePromo(): PromoContent {
    return homeContent.promo;
  }

  getHomeProducts(): ProductCard[] {
    return homeContent.products;
  }
}
