import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  readonly disabled = input<boolean>(false);
  readonly value = input<string>('');
  readonly required = input<boolean>(false);
  readonly min = input<string>();
  readonly max = input<string>();

  readonly valueChange = output<string>();

  onChange({ target }: Event): void {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.valueChange.emit(target.value);
  }
}
