import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon';

import { TooltipDirective } from '../../directives/tooltip';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-external-link',
  imports: [IconComponent, TooltipDirective],
  templateUrl: './icon-external-link.component.html',
  styleUrl: './icon-external-link.component.scss',
})
export class IconExternalLinkComponent {
  readonly href = input.required<string>();
  readonly icon = input.required<ReturnType<IconComponent['name']>>();
  readonly size = input<ReturnType<IconComponent['size']>>('m');
  readonly label = input.required<string>();
  readonly tooltipPosition = input<ReturnType<TooltipDirective['tooltipPosition']>>('block-start');
  readonly tooltipColor = input<ReturnType<TooltipDirective['tooltipColor']>>('dark');

  protected readonly _testIds = APP_TEST_IDS.iconExternalLink;
}
