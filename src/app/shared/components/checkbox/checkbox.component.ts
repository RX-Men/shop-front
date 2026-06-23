import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { CheckboxSize } from './checkbox.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  readonly name = input<string>();
  readonly value = input<string>();
  readonly checked = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<CheckboxSize>('m');

  readonly checkedChange = output<boolean>();

  onInputChange({ target }: Event): void {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.checkedChange.emit(target.checked);
  }
}
