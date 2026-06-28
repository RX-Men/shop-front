import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { IconComponent } from '../icon';

import { getPlaceholder } from './select.utils';

import type { LabelOrientation, Option } from './select.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select',
  imports: [IconComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  host: {
    '(document:click)': '_onDocumentClick($event)',
    '(document:keydown.escape)': '_onEscapePressed()',
  },
})
export class SelectComponent<TValue extends string = string> {
  readonly label = input<string>();
  readonly labelOrientation = input<LabelOrientation>('horizontal');
  readonly placeholder = input<string>();
  readonly options = input<Option<TValue>[]>([]);
  readonly selectedOptionValues = input<Option<TValue>['value'][]>([]);
  readonly multiple = input<boolean>();

  readonly selectedOptionValuesChange = output<Option<TValue>['value'][]>();

  readonly isOpen = signal(false);

  protected readonly _labelId = crypto.randomUUID();
  protected readonly _listboxId = crypto.randomUUID();
  protected readonly _isOptionSelected = computed(
    () =>
      (value: Option<TValue>['value']): boolean =>
        this.selectedOptionValues().includes(value),
  );

  private readonly _elementRef: ElementRef<HTMLDivElement>;

  constructor() {
    const element = inject<ElementRef<HTMLDivElement>>(ElementRef);

    this._elementRef = element;
  }

  readonly computedPlaceholder = computed(() =>
    getPlaceholder(this.options(), this.selectedOptionValues(), this.placeholder()),
  );

  protected _onOptionChange({ target }: Event): void {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (this.multiple()) {
      this._onMultipleOptionChange(target);
    } else {
      this._onSingleOptionChange(target);
    }
  }

  protected _onClick(): void {
    this._onOpenChange();
  }

  protected _onKeydown(event: KeyboardEvent): void {
    if (event.code !== 'Space') {
      return;
    }

    event.preventDefault();
    this._onOpenChange();
  }

  protected _onDocumentClick({ target }: MouseEvent): void {
    if (!(target instanceof HTMLElement || target instanceof SVGElement)) {
      return;
    }

    const isClickedInside = this._elementRef.nativeElement.contains(target);
    if (isClickedInside) {
      return;
    }

    this.isOpen.set(false);
  }

  protected _onEscapePressed(): void {
    this.isOpen.set(false);
  }

  private _onOpenChange(): void {
    this.isOpen.update((previousState) => !previousState);
  }

  private _onSingleOptionChange({ value }: HTMLInputElement): void {
    const v = value as TValue;

    this.selectedOptionValuesChange.emit(this.selectedOptionValues().includes(v) ? [] : [v]);
    this.isOpen.set(false);
  }

  private _onMultipleOptionChange({ value, checked }: HTMLInputElement): void {
    const selectedOptionValues = this.selectedOptionValues();
    const nextSelectedOptionValues = checked
      ? [...selectedOptionValues, value]
      : selectedOptionValues.filter((v) => v !== value);

    this.selectedOptionValuesChange.emit(nextSelectedOptionValues as TValue[]);
  }
}
