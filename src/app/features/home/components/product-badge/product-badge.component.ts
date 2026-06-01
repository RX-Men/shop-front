import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { ProductBadgeStatus } from './product-badge.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-badge',
  templateUrl: './product-badge.component.html',
  styleUrl: './product-badge.component.scss',
})
export class ProductBadgeComponent {
  readonly status = input<ProductBadgeStatus>('active');

  protected readonly _testIds = APP_TEST_IDS.productBadge;
}
