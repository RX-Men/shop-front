import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { IconName, IconSize } from './icon.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<IconSize>('m');

  readonly href = computed(() => `@/assets/icons/sprite.svg#${this.name()}`);
}
