import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonComponent } from '@/app/shared/components/button';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button-demo',
  imports: [ButtonComponent, UiKitRowComponent],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.scss',
})
export class ButtonDemoComponent {}
