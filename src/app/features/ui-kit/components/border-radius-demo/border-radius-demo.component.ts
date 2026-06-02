import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-border-radius-demo',
  imports: [UiKitRowComponent],
  templateUrl: './border-radius-demo.component.html',
  styleUrl: './border-radius-demo.component.scss',
})
export class BorderRadiusDemoComponent {}
