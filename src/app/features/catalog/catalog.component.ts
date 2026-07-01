import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NgTemplateOutlet, ViewportScroller } from '@angular/common';

import { ButtonComponent } from '@/app/shared/components/button';
import { DrawerComponent } from '@/app/shared/components/drawer';
import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { PaginationComponent } from '@/app/shared/components/pagination';
import { SkeletonComponent } from '@/app/shared/components/skeleton';

import { CatalogFiltersComponent } from './components/catalog-filters';
import { CatalogGridComponent } from './components/catalog-grid';
import { CatalogToolbarComponent } from './components/catalog-toolbar';

import { CartService } from '@/app/core/services/cart.service';
import { CatalogService } from '@/app/core/services/catalog';
import { UiService } from '@/app/core/services/ui';

import { getCatalogTotalCountLabel } from './catalog.utils';

import { generateProductCardSkeleton } from '@/app/shared/components/product-card';
import { generateCheckboxGroupSkeleton } from '@/app/shared/components/checkbox-group';

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
    PaginationComponent,
    SkeletonComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  ngOnInit(): void {
    this._loadCatalog();
  }

  protected readonly _isCatalogLoading = signal<boolean>(true);

  protected readonly _catalogService = inject(CatalogService);
  protected readonly _uiService = inject(UiService);
  private readonly _viewportScroller = inject(ViewportScroller);
  protected readonly _cartService = inject(CartService);

  protected readonly _content = catalogContent;

  protected readonly _productsSkeleton = computed(() =>
    generateProductCardSkeleton(this._pageSize()),
  );
  protected readonly _filtersSkeleton = computed(() => generateCheckboxGroupSkeleton(5, 5));

  protected readonly _pageSize = computed(() => Number(this._catalogService.limit()));

  protected readonly _totalCountLabel = computed(() =>
    getCatalogTotalCountLabel({
      page: this._catalogService.page(),
      limit: Number(this._catalogService.limit()),
      total: this._catalogService.total(),
    }),
  );

  protected readonly _isDrawerOpen = computed(() =>
    this._uiService.isDrawerOpen(DRAWER_KEY.filters),
  );

  protected readonly _changePage = (page: number): void => {
    this._catalogService.changePage(page);
    this._viewportScroller.scrollToPosition([0, 0]);
  };

  protected readonly _toggleDrawer = (): void => {
    if (this._uiService.isDrawerOpen(DRAWER_KEY.filters)) {
      this._uiService.closeDrawer();
    } else {
      this._uiService.openDrawer(DRAWER_KEY.filters);
    }
  };

  private async _loadCatalog(): Promise<void> {
    this._isCatalogLoading.set(true);

    try {
      await Promise.allSettled([
        this._catalogService.fetchProducts(),
        this._catalogService.fetchFilters(),
      ]);
    } finally {
      this._isCatalogLoading.set(false);
    }
  }
}
