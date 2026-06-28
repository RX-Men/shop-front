import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { ButtonComponent } from '@/app/shared/components/button';
import { CheckboxGroupComponent } from '@/app/shared/components/checkbox-group';

import catalogContent from '@/app/content/pages/catalog/catalog.json' with { type: 'json' };

import type { GroupFilters } from './catalog-filters.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-catalog-filters',
  imports: [ButtonComponent, CheckboxGroupComponent],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.scss',
})
export class CatalogFiltersComponent {
  readonly groups = input.required<GroupFilters[] | null>();
  readonly checkedByGroup = input.required<Record<string, Set<string>>>();

  readonly checkedChange = output<{ groupName: string; value: string }>();
  readonly resetClick = output<void>();

  protected readonly _content = catalogContent.filters;

  protected readonly _getCheckedSet = computed(
    () =>
      (groupName: string): Set<string> =>
        this.checkedByGroup()[groupName] ?? new Set(),
  );

  protected readonly _isResetButtonEnabled = computed(() => {
    const checkedByGroup = this.checkedByGroup();

    return Object.keys(checkedByGroup).some((k) => {
      const group = k as keyof typeof checkedByGroup;
      return checkedByGroup[group].size > 0;
    });
  });

  protected readonly _onCheckedChange = (groupName: string, value: string): void => {
    this.checkedChange.emit({ groupName, value });
  };

  protected readonly _onResetClick = (): void => {
    this.resetClick.emit();
  };
}
