import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { IconRouterLinkComponent } from '@/app/shared/components/icon-router-link';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

import { ICON_NAME, ICON_SIZE } from '@/app/shared/components/icon/icon.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icon-router-link-demo',
  imports: [IconRouterLinkComponent, UiKitRowComponent],
  templateUrl: './icon-router-link-demo.component.html',
  styleUrl: './icon-router-link-demo.component.scss',
})
export class IconRouterLinkDemoComponent {
  protected readonly _icons = computed(() => Object.values(ICON_NAME));
  protected readonly _sizes = computed(() => Object.values(ICON_SIZE));
}
