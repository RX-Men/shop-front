import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type {
  ActionColor,
  ActionIconPlacement,
  ActionSize,
  ActionVariant,
} from '../../models/ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-external-link',
  imports: [IconComponent],
  templateUrl: './external-link.component.html',
  styleUrl: './external-link.component.scss',
})
export class ExternalLinkComponent {
  readonly href = input.required<string>();
  readonly variant = input<ActionVariant>('contained');
  readonly size = input<ActionSize>('m');
  readonly color = input<ActionColor>('brand');
  readonly icon = input<ReturnType<IconComponent['name']>>();
  readonly iconPlacement = input<ActionIconPlacement>('end');

  protected readonly _testIds = APP_TEST_IDS.externalLink;
}
