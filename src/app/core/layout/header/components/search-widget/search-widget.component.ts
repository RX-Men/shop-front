import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';

import { EmptyComponent } from '@/app/shared/components/empty';
import { InputComponent } from '@/app/shared/components/input';
import { ProductCardComponent } from '@/app/shared/components/product-card';
import { SpinComponent } from '@/app/shared/components/spin';

import { SearchService } from '@/app/core/services/search';

import headerContent from '@/app/content/layout/header/header.json' with { type: 'json' };

import { ROUTES } from '@/app/core/constants/routes';

import type { ProductCard } from '@/app/shared/components/product-card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-widget',
  imports: [EmptyComponent, FormField, InputComponent, ProductCardComponent, SpinComponent],
  templateUrl: './search-widget.component.html',
  styleUrl: './search-widget.component.scss',
  host: {
    '(transitionend)': '_autofocusInput($event)',
  },
})
export class SearchWidgetComponent {
  private readonly _searchService = inject(SearchService);

  protected readonly _resultList = signal<ProductCard[] | null>(null);
  protected readonly _totalCount = signal<number>(0);

  protected readonly _totalCountLabel = computed(() => {
    const totalCount = this._totalCount();
    return totalCount === 1
      ? `${totalCount} ${this._data.singleResultLabel}`
      : `${totalCount} ${this._data.multipleResultLabel}`;
  });

  protected readonly _data = headerContent.search;
  protected readonly _routes = ROUTES;

  constructor() {
    effect(() => {
      this._totalCount.set(0);
      const query = this._searchForm.query().value().trim();

      if (!query || query.length === 0) {
        this._resultList.set(null);
        this._isSearching.set(false);
        return;
      }

      this._isSearching.set(true);

      this._searchService
        .fetchProductsByText(query)
        .then((data) => {
          this._resultList.set(data.results);
          this._totalCount.set(data.total);
        })
        .finally(() => {
          this._isSearching.set(false);
        });
    });
  }

  protected readonly _shouldAutofocus = signal<boolean>(false);

  protected readonly _searchModel = signal({
    query: '',
  });
  protected readonly _isSearching = signal<boolean>(false);

  protected readonly _searchForm = form(this._searchModel, (schemaPath) => {
    debounce(schemaPath.query, 300);
  });

  protected readonly _autofocusInput = (event: TransitionEvent): void => {
    if (event.propertyName !== 'visibility') {
      return;
    }

    this._shouldAutofocus.update((prevState) => !prevState);
  };
}
