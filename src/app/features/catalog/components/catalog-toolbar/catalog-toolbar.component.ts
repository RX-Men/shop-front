import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { SelectComponent } from '@/app/shared/components/select';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-toolbar',
  imports: [SelectComponent],
  templateUrl: './catalog-toolbar.component.html',
  styleUrl: './catalog-toolbar.component.scss',
})
export class CatalogToolbarComponent {
  protected readonly _content = catalogContent.toolbar;

  readonly selectedSortValue =
    input.required<ReturnType<SelectComponent['selectedOptionValues']>>();
  readonly selectedPerPageValue =
    input.required<ReturnType<SelectComponent['selectedOptionValues']>>();

  readonly changeSelectedSortValue = output<ReturnType<SelectComponent['selectedOptionValues']>>();
  readonly changeSelectedPerPageValue =
    output<ReturnType<SelectComponent['selectedOptionValues']>>();

  protected readonly _onChangeSelectedSortValue = (
    selected: ReturnType<SelectComponent['selectedOptionValues']>,
  ): void => {
    this.changeSelectedSortValue.emit(selected);
  };
  protected readonly _onChangeSelectedPerPageValue = (
    selected: ReturnType<SelectComponent['selectedOptionValues']>,
  ): void => {
    this.changeSelectedPerPageValue.emit(selected);
  };
}
