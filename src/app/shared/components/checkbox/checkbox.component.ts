import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { SkeletonComponent } from '../skeleton';

import type { CheckboxSize } from './checkbox.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkbox',
  imports: [SkeletonComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  host: {
    '[class.checkbox_width_full]': 'isWidthFull()',
  },
})
export class CheckboxComponent {
  readonly name = input<string>();
  readonly value = input<string>();
  readonly checked = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<CheckboxSize>('m');
  readonly isWidthFull = input<boolean>();
  readonly loading = input<boolean>();

  readonly checkedChange = output<boolean>();

  onInputChange({ target }: Event): void {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.checkedChange.emit(target.checked);
  }
}
