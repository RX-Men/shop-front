import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon';
import { SpinComponent } from '../spin';

import { APP_TEST_IDS } from '../../../app.test-ids';

import type {
  ActionColor,
  ActionIconPlacement,
  ActionSize,
  ActionVariant,
  ButtonType,
} from '../../models/ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button',
  imports: [IconComponent, SpinComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '(click)': '_onAction($event)',
    '(keydown)': '_onAction($event)',
  },
})
export class ButtonComponent {
  readonly type = input<ButtonType>('button');
  readonly variant = input<ActionVariant>('contained');
  readonly size = input<ActionSize>('m');
  readonly color = input<ActionColor>('brand');
  readonly icon = input<ReturnType<IconComponent['name']>>();
  readonly iconPlacement = input<ActionIconPlacement>('end');
  readonly loading = input<boolean>();
  readonly disabled = input<boolean>();

  protected readonly _testIds = APP_TEST_IDS.button;

  protected readonly _onAction = (event: Event): void => {
    if (this.loading() || this.disabled()) {
      event.stopPropagation();
      return;
    }
  };
}
