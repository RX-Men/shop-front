import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { APP_TEST_IDS } from '../../../app.test-ids';

import type { SpinColor, SpinSize } from './spin.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.scss',
})
export class SpinComponent {
  readonly size = input<SpinSize>('m');
  readonly color = input<SpinColor>('current');
  readonly description = input<string>('');

  protected readonly _testIds = APP_TEST_IDS.spin;
}
