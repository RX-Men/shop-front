import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BannerComponent } from '@/app/shared/components/banner';
import { CarouselComponent } from '@/app/shared/components/carousel';
import { ExternalLinkComponent } from '@/app/shared/components/external-link';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { AUTOPLAY_IN_MS } from './hero.constants';

import type { HeroCarouselBanner } from './hero.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  imports: [BannerComponent, CarouselComponent, ExternalLinkComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly carouselBanners = input.required<HeroCarouselBanner[]>();

  protected readonly _autoplayInMs = AUTOPLAY_IN_MS;
  protected readonly _testIds = APP_TEST_IDS.hero;
}
