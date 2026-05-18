import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { InputSize, InputStatus, InputType } from './input.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly value = model<string>('');

  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('m');
  readonly status = input<InputStatus>('default');

  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonlyMode = input<boolean>(false);
  readonly required = input<boolean>(false);

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly errorText = input<string>('');

  readonly maxlength = input<number | null>(null);
  readonly autocomplete = input<string>('off');
  readonly name = input<string>('');

  readonly inputId = input<string>('');

  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  private static nextUid = 0;
  private readonly autoId = `app-input-${++InputComponent.nextUid}`;

  private readonly cvaDisabled = signal(false);

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  protected readonly resolvedId = computed(() => this.inputId() || this.autoId);

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.status() === 'error' && this.errorText()) {
      ids.push(`${this.resolvedId()}-error`);
    } else if (this.hint()) {
      ids.push(`${this.resolvedId()}-hint`);
    }
    return ids.length ? ids.join(' ') : null;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange: (v: string) => void = (_: string) => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(v: string | null): void {
    this.value.set(v ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  protected handleInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  protected handleBlur(e: FocusEvent): void {
    this.onTouched();
    this.blurred.emit(e);
  }
}
