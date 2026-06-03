import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { IconComponent } from '@/app/shared/components/icon';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { InputSize, InputType } from './input.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input',
  imports: [IconComponent],
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

  readonly showPasswordToggle = input<boolean>(false);

  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  protected readonly _testIds = APP_TEST_IDS.input;

  protected readonly _showPassword = signal(false);

  protected readonly _resolvedType = computed(() =>
    this.type() === 'password' && this._showPassword() ? 'text' : this.type(),
  );

  protected readonly resolvedId = `app-input-${crypto.randomUUID()}`;

  protected readonly isDisabled = computed(() => this.disabled());

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.error() && this.errorText()) {
      ids.push(`${this.resolvedId}-error`);
    } else if (this.hint()) {
      ids.push(`${this.resolvedId}-hint`);
    }
    return ids.length ? ids.join(' ') : null;
  });

  protected togglePasswordVisibility(): void {
    this._showPassword.update((v) => !v);
  }

  protected handleInput(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const v = e.target.value;
    this.value.set(v);
  }
}
