import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import headerContent from '@/app/content/layout/header/header.json' with { type: 'json' };

import { IconButtonComponent } from '../icon-button';
import { LogoComponent } from '../logo';
import { PopoverComponent } from '../popover';
import { RouterLinkComponent } from '../router-link';

import { CartButtonComponent } from './components/cart-button';
import { SearchWidgetComponent } from './components/search-widget';

import { getSearchWidgetData } from './header.utils';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { ROUTES } from '@/app/core/constants/routes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  imports: [
    CartButtonComponent,
    IconButtonComponent,
    LogoComponent,
    PopoverComponent,
    RouterLinkComponent,
    SearchWidgetComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(click)': '_closeWidgetOnBackdropClick($event)',
    '(keydown)': '_closeWidgetOnBackdropKeydown($event)',
  },
})
export class HeaderComponent {
  protected readonly _data = headerContent;

  protected readonly _productsCount = 10;
  protected readonly _profilePopoverId = crypto.randomUUID();

  protected readonly _testIds = APP_TEST_IDS.header;
  protected readonly _routes = ROUTES;

  protected readonly searchWidgetToggleButton = computed(() =>
    getSearchWidgetData(this._isSearchWidgetOpen(), this._data.search.toggleButton),
  );
  protected readonly _isSearchWidgetOpen = signal<boolean>(false);

  protected readonly _toggleSearchWidget = (): void => {
    this._isSearchWidgetOpen.update((prevState) => !prevState);
  };

  protected readonly _closeWidgetOnBackdropClick = ({ target }: Event): void => {
    if (
      !this._isSearchWidgetOpen() ||
      !(target instanceof HTMLElement) ||
      !target.classList.contains('search-widget')
    ) {
      return;
    }

    this._isSearchWidgetOpen.set(false);
  };

  protected readonly _closeWidgetOnBackdropKeydown = (event: KeyboardEvent): void => {
    if (!this._isSearchWidgetOpen() || event.key !== 'Escape') {
      return;
    }

    this._isSearchWidgetOpen.set(false);
  };
}
