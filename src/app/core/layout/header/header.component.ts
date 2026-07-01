import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import headerContent from '@/app/content/layout/header/header.json' with { type: 'json' };

import { DrawerComponent } from '@/app/shared/components/drawer';
import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { LogoComponent } from '@/app/shared/components/logo';
import { PopoverComponent } from '@/app/shared/components/popover';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { CartButtonComponent } from './components/cart-button';
import { SearchWidgetComponent } from './components/search-widget';

import { UiService } from '@/app/core/services/ui';

import { getSearchWidgetData } from './header.utils';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { ROUTES } from '@/app/core/constants/routes';
import { DRAWER_KEY } from '@/app/core/services/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  imports: [
    CartButtonComponent,
    DrawerComponent,
    IconButtonComponent,
    LogoComponent,
    PopoverComponent,
    RouterLinkComponent,
    SearchWidgetComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly _uiService = inject(UiService);

  protected readonly _data = headerContent;

  protected readonly _productsCount = 10;
  protected readonly _profilePopoverId = crypto.randomUUID();

  protected readonly _testIds = APP_TEST_IDS.header;
  protected readonly _routes = ROUTES;

  protected readonly searchWidgetToggleButton = computed(() =>
    getSearchWidgetData(
      this._uiService.isDrawerOpen(DRAWER_KEY.search),
      this._data.search.toggleButton,
    ),
  );

  protected readonly _isDrawerOpen = computed(() =>
    this._uiService.isDrawerOpen(DRAWER_KEY.search),
  );

  protected readonly _toggleDrawer = (): void => {
    if (this._uiService.isDrawerOpen(DRAWER_KEY.search)) {
      this._uiService.closeDrawer();
    } else {
      this._uiService.openDrawer(DRAWER_KEY.search);
    }
  };
}
