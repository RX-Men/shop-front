import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { CheckboxGroupComponent } from '../../../../shared/components/checkbox-group';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-filters',
  imports: [CheckboxGroupComponent],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.scss',
})
export class CatalogFiltersComponent {
  readonly checkedByGroup = input.required<Record<string, Set<string>>>();

  readonly checkedChange = output<{ groupName: string; value: string }>();

  protected readonly _content = catalogContent.filters;

  protected readonly _getCheckedSet = computed(
    () =>
      (groupName: string): Set<string> =>
        this.checkedByGroup()[groupName] ?? new Set(),
  );

  protected readonly _onCheckedChange = (groupName: string, value: string): void => {
    this.checkedChange.emit({ groupName, value });
  };
}
