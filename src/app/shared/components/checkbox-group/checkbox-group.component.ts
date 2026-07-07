import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SkeletonComponent } from '../skeleton';

import type { CheckboxGroupItem } from './checkbox-group.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkbox-group',
  imports: [CheckboxComponent, SkeletonComponent],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
})
export class CheckboxGroupComponent {
  readonly label = input.required<string>();
  readonly name = input.required<ReturnType<CheckboxComponent['name']>>();
  readonly items = input.required<CheckboxGroupItem[]>();
  readonly checked = input<Set<string>>(new Set());
  readonly loading = input<boolean>();

  readonly checkedChange = output<NonNullable<ReturnType<CheckboxComponent['value']>>>();

  readonly onInputChange = (value: NonNullable<ReturnType<CheckboxComponent['value']>>): void => {
    this.checkedChange.emit(value);
  };
}
