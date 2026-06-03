import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BannerComponent } from '@/app/shared/components/banner';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-promo-section',
  imports: [BannerComponent, RouterLinkComponent],
  templateUrl: './promo-section.component.html',
  styleUrl: './promo-section.component.scss',
})
export class PromoSectionComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly description = input.required<string>();
  readonly imgSrc = input.required<string>();
  readonly link = input.required<string>();

  protected readonly _testIds = APP_TEST_IDS.promoSection;
}
