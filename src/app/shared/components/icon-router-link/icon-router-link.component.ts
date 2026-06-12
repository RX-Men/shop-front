import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../icon/icon.component';

import { TooltipDirective } from '../../directives/tooltip';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-router-link',
  imports: [IconComponent, RouterLink, TooltipDirective],
  templateUrl: './icon-router-link.component.html',
  styleUrl: './icon-router-link.component.scss',
})
export class IconRouterLinkComponent {
  readonly routerLink = input.required<string>();
  readonly icon = input.required<ReturnType<IconComponent['name']>>();
  readonly size = input<ReturnType<IconComponent['size']>>('m');
  readonly label = input.required<string>();
  readonly tooltipPosition = input<ReturnType<TooltipDirective['tooltipPosition']>>('block-start');
  readonly tooltipColor = input<ReturnType<TooltipDirective['tooltipColor']>>('dark');

  protected readonly _testIds = APP_TEST_IDS.iconRouterLink;
}
