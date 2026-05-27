import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import type { BannerVariant } from './banner.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-banner',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  readonly variant = input<BannerVariant>('diagonal');

  readonly imgSrc = input.required<string>();
  readonly imgPriority = input<boolean>();

  readonly link = input<string>();

  protected readonly _testIds = APP_TEST_IDS.banner;
}
