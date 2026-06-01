import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { CheckboxSize } from './checkbox.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  readonly checked = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<CheckboxSize>('m');

  readonly checkedChange = output<boolean>();

  onInputChange(event: Event): void {
    const checkboxElement = event.target as HTMLInputElement;
    this.checkedChange.emit(checkboxElement.checked);
  }
}
