import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-colors-demo',
  imports: [UiKitRowComponent],
  templateUrl: './colors-demo.component.html',
  styleUrl: './colors-demo.component.scss',
})
export class ColorsDemoComponent {}
