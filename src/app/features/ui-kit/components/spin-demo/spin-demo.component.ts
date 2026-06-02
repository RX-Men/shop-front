import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpinComponent } from '@/app/shared/components/spin';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spin-demo',
  imports: [SpinComponent, UiKitRowComponent],
  templateUrl: './spin-demo.component.html',
  styleUrl: './spin-demo.component.scss',
})
export class SpinDemoComponent {}
