import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CheckboxComponent } from '@/app/shared/components/checkbox';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkbox-demo',
  imports: [CheckboxComponent, UiKitRowComponent],
  templateUrl: './checkbox-demo.component.html',
  styleUrl: './checkbox-demo.component.scss',
})
export class CheckboxDemoComponent {}
