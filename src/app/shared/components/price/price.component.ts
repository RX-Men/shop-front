import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { getPriceAriaLabel } from './price.utils';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import { PricePipe } from '@/app/shared/pipes/price';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-price',
  imports: [PricePipe],
  providers: [PricePipe],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
})
export class PriceComponent {
  readonly currentPrice = input.required<number>();
  readonly oldPrice = input.required<number>();
  readonly discount = input.required<number>();

  protected readonly _testIds = APP_TEST_IDS.price;

  protected readonly _priceAriaLabel = computed(() =>
    getPriceAriaLabel(
      this._pricePipe.transform(this.currentPrice()),
      this._pricePipe.transform(this.oldPrice()),
      this._withDiscount(),
    ),
  );

  protected readonly _withDiscount = computed(() => this.discount() > 0);

  private readonly _pricePipe = inject(PricePipe);
}
