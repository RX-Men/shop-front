import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

import { ICON_NAME, ICON_SIZE } from '@/app/shared/components/icon/icon.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-button-demo',
  imports: [IconButtonComponent, UiKitRowComponent],
  templateUrl: './icon-button-demo.component.html',
  styleUrl: './icon-button-demo.component.scss',
})
export class IconButtonDemoComponent {
  protected readonly _icons = computed(() => Object.values(ICON_NAME));
  protected readonly _sizes = computed(() => Object.values(ICON_SIZE));
}
