import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-picker-control',
  templateUrl: './picker-control.component.html',
  styleUrl: './picker-control.component.scss',
})
export class PickerControlComponent {
  readonly ariaLabel = input.required<string>();
  readonly active = input<boolean>();

  protected readonly _testIds = APP_TEST_IDS.pickerControl;
}
