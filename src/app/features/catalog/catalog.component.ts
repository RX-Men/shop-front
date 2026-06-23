import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ButtonComponent } from '@/app/shared/components/button';
import { DrawerComponent } from '@/app/shared/components/drawer';
import { IconButtonComponent } from '@/app/shared/components/icon-button';

import { CatalogFiltersComponent } from './components/catalog-filters';
import { CatalogGridComponent } from './components/catalog-grid';
import { CatalogToolbarComponent } from './components/catalog-toolbar';

import { CatalogService } from '@/app/core/services/catalog';
import { UiService } from '@/app/core/services/ui';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };
import { DRAWER_KEY } from '@/app/core/services/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog',
  imports: [
    ButtonComponent,
    CatalogFiltersComponent,
    CatalogGridComponent,
    CatalogToolbarComponent,
    DrawerComponent,
    IconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  protected readonly _catalogService = inject(CatalogService);
  protected readonly _uiService = inject(UiService);

  protected readonly _content = catalogContent;

  protected readonly _checkedFiltersByGroup = signal<Record<string, Set<string>>>({});

  protected readonly _selectedSortValue = signal<string[]>([]);
  protected readonly _selectedPerPageValue = signal<string[]>([
    this._content.toolbar.perPage.defaultValue,
  ]);

  protected readonly _isDrawerOpen = computed(() =>
    this._uiService.isDrawerOpen(DRAWER_KEY.filters),
  );

  protected readonly _onFiltersCheckedChange = ({
    groupName,
    value,
  }: {
    groupName: string;
    value: string;
  }): void => {
    this._checkedFiltersByGroup.update((state) => {
      const next = new Set(state[groupName]);

      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }

      return {
        ...state,
        [groupName]: next,
      };
    });
  };

  protected readonly _onChangeSelectedSortValue = (selected: string[]): void => {
    this._selectedSortValue.set(selected);
  };

  protected readonly _onChangeSelectedPerPageValue = (selected: string[]): void => {
    this._selectedPerPageValue.set(selected);
  };

  protected readonly _toggleDrawer = (): void => {
    if (this._uiService.isDrawerOpen(DRAWER_KEY.filters)) {
      this._uiService.closeDrawer();
    } else {
      this._uiService.openDrawer(DRAWER_KEY.filters);
    }
  };
}
