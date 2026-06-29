import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { ButtonComponent } from '../button';
import { IconButtonComponent } from '../icon-button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pagination',
  imports: [ButtonComponent, IconButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  readonly current = input<number>(0);
  readonly pageSize = input.required<number>();
  readonly total = input.required<number>();

  protected readonly _id = crypto.randomUUID();

  protected readonly _count = computed(() => {
    const count = Math.ceil(this.total() / this.pageSize());
    return Array.from({ length: count || 1 }, (_, index) => index);
  });

  protected readonly _isPreviousDisabled = computed(() => this.current() === 0);
  protected readonly _isCurrent = computed(
    () =>
      (item: number): boolean =>
        item === this.current(),
  );
  protected readonly _isNextDisabled = computed(() => this.current() >= this._count().length - 1);

  readonly pageChange = output<number>();

  protected readonly _onPageChange = (value: number): void => {
    if (value === this.current() || value < 0 || value >= this._count().length) {
      return;
    }

    this.pageChange.emit(value);
  };
}
