import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DatePickerComponent } from '@/app/shared/components/date-picker';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-date-picker-demo',
  imports: [DatePickerComponent, UiKitRowComponent],
  templateUrl: './date-picker-demo.component.html',
  styleUrl: './date-picker-demo.component.scss',
})
export class DatePickerDemoComponent {}
