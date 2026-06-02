import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-typography-demo',
  imports: [UiKitRowComponent],
  templateUrl: './typography-demo.component.html',
  styleUrl: './typography-demo.component.scss',
})
export class TypographyDemoComponent {}
