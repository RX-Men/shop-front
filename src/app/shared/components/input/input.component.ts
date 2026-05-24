import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

import { APP_TEST_IDS } from '../../../app.test-ids';

import type { InputSize, InputType } from './input.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  readonly value = model<string>('');

  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('m');

  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly error = input<boolean>(false);
  readonly readonlyMode = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly warning = input<boolean>(false);

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly errorText = input<string>('');

  readonly maxlength = input<number | null>(null);
  readonly minlength = input<number | null>(null);
  readonly autocomplete = input<string>('off');
  readonly name = input<string>('');

  readonly inputId = input<string>('');

  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  private readonly autoId = `app-input-${crypto.randomUUID()}`;

  protected readonly _testIds = APP_TEST_IDS.input;

  protected readonly isDisabled = computed(() => this.disabled());

  protected readonly resolvedId = computed(() => this.inputId() || this.autoId);

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.error() && this.errorText()) {
      ids.push(`${this.resolvedId()}-error`);
    } else if (this.hint()) {
      ids.push(`${this.resolvedId()}-hint`);
    }
    return ids.length ? ids.join(' ') : null;
  });

  protected handleInput(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const v = e.target.value;
    this.value.set(v);
  }

  protected handleBlur(e: FocusEvent): void {
    this.blurred.emit(e);
  }
}
