import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LogoComponent } from '@/app/shared/components/logo';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo-demo',
  imports: [LogoComponent, UiKitRowComponent],
  templateUrl: './logo-demo.component.html',
})
export class LogoDemoComponent {}
