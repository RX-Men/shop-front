import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { IconComponent } from '@/app/shared/components/icon';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

import { ICON_NAME, ICON_SIZE } from '@/app/shared/components/icon/icon.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-demo',
  imports: [IconComponent, UiKitRowComponent],
  templateUrl: './icon-demo.component.html',
  styleUrl: './icon-demo.component.scss',
})
export class IconDemoComponent {
  protected readonly _icons = computed(() => Object.values(ICON_NAME));
  protected readonly _sizes = computed(() => Object.values(ICON_SIZE));
}
