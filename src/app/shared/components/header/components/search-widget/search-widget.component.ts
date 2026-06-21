import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';

import { EmptyComponent } from '../../../empty';
import { InputComponent } from '../../../input';
import { ProductCardComponent } from '../../../product-card';
import { SpinComponent } from '../../../spin';

import headerContent from '@/app/content/layout/header/header.json' with { type: 'json' };
import productsMock from '@/app/core/mocks/products.json' with { type: 'json' };

import type { ProductCard } from '../../../product-card';

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
  // TODO: change to input from header?
  readonly _resultList = signal<ProductCard[] | null>(null);
  readonly open = input<boolean>(false);

  protected readonly _data = headerContent.search;

  constructor() {
    effect(() => {
      const text = this._searchForm.query().value();

      if (!text || text.trim().length === 0) {
        this._resultList.set(null);
        this._isSearching.set(false);
        return;
      }

      this._isSearching.set(true);

      // TODO: mocks before API integration
      setTimeout(() => {
        const result = productsMock.filter((product) =>
          product.heading.toLowerCase().includes(text.toLowerCase()),
        );

        this._resultList.set(result);
        this._isSearching.set(false);
      }, 300);
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
