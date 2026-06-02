import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputComponent } from '@/app/shared/components/input';

import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-demo',
  imports: [InputComponent, UiKitRowComponent],
  templateUrl: './input-demo.component.html',
  styleUrl: './input-demo.component.scss',
})
export class InputDemoComponent {
  value = 'edit me';
}
