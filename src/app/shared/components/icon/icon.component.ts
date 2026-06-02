import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { APP_TEST_IDS } from '@/app/app.test-ids';

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

  protected readonly _href = computed(() => `@/assets/icons/sprite.svg#${this.name()}`);

  protected readonly _testIds = APP_TEST_IDS.icon;
}
