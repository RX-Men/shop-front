import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon';

import { TooltipDirective } from '../../directives/tooltip';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { ButtonType } from '../../models/ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-button',
  imports: [IconComponent, TooltipDirective],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  host: {
    '(click)': '_onAction($event)',
    '(keydown)': '_onAction($event)',
  },
})
export class IconButtonComponent {
  readonly type = input<ButtonType>('button');
  readonly icon = input.required<ReturnType<IconComponent['name']>>();
  readonly size = input<ReturnType<IconComponent['size']>>('m');
  readonly label = input.required<string>();
  readonly tooltipPosition = input<ReturnType<TooltipDirective['tooltipPosition']>>('block-start');
  readonly tooltipColor = input<ReturnType<TooltipDirective['tooltipColor']>>('dark');
  readonly popovertarget = input<string>();
  readonly ariaPressed = input<boolean | 'mixed'>();
  readonly disabled = input<boolean>();

  protected readonly _testIds = APP_TEST_IDS.iconButton;

  protected readonly _onAction = (event: Event): void => {
    if (this.disabled()) {
      event.stopPropagation();
      return;
    }
  };
}
