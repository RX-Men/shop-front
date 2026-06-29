import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
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
export class CatalogComponent implements OnInit {
  ngOnInit(): void {
    Promise.allSettled([this._catalogService.fetchProducts(), this._catalogService.fetchFilters()]);
  }

  protected readonly _catalogService = inject(CatalogService);
  protected readonly _uiService = inject(UiService);

  protected readonly _content = catalogContent;

  protected readonly _totalCountLabel = computed(() => {
    const total = this._catalogService.total();
    return `${total} ${total === 1 ? this._content.toolbar.productCountLabelSingular : this._content.toolbar.productCountLabelPlural}`;
  });

  protected readonly _isDrawerOpen = computed(() =>
    this._uiService.isDrawerOpen(DRAWER_KEY.filters),
  );

  protected readonly _toggleDrawer = (): void => {
    if (this._uiService.isDrawerOpen(DRAWER_KEY.filters)) {
      this._uiService.closeDrawer();
    } else {
      this._uiService.openDrawer(DRAWER_KEY.filters);
    }
  };
}
