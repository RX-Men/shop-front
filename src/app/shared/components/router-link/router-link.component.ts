import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../icon';

import type {
  ActionColor,
  ActionIconPlacement,
  ActionSize,
  ActionVariant,
} from '../../models/ui.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-router-link',
  imports: [IconComponent, RouterLink],
  templateUrl: './router-link.component.html',
  styleUrl: './router-link.component.scss',
})
export class RouterLinkComponent {
  readonly routerLink = input.required<string>();
  readonly variant = input<ActionVariant>('contained');
  readonly size = input<ActionSize>('m');
  readonly color = input<ActionColor>('brand');
  readonly icon = input<ReturnType<IconComponent['name']>>();
  readonly iconPlacement = input<ActionIconPlacement>('end');
}
