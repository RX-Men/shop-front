import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { IconExternalLinkComponent } from '@/app/shared/components/icon-external-link';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

import { ICON_NAME, ICON_SIZE } from '@/app/shared/components/icon/icon.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-external-link-demo',
  imports: [IconExternalLinkComponent, UiKitRowComponent],
  templateUrl: './icon-external-link-demo.component.html',
  styleUrl: './icon-external-link-demo.component.scss',
})
export class IconExternalLinkDemoComponent {
  protected readonly _icons = computed(() => Object.values(ICON_NAME));
  protected readonly _sizes = computed(() => Object.values(ICON_SIZE));
}
