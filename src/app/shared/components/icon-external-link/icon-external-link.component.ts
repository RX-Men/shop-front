import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-external-link',
  imports: [IconComponent],
  templateUrl: './icon-external-link.component.html',
  styleUrl: './icon-external-link.component.scss',
})
export class IconExternalLinkComponent {
  readonly href = input.required<string>();
  readonly icon = input.required<ReturnType<IconComponent['name']>>();
  readonly size = input<ReturnType<IconComponent['size']>>('m');
  readonly ariaLabel = input.required<string>();

  protected readonly _testIds = APP_TEST_IDS.iconExternalLink;
}
