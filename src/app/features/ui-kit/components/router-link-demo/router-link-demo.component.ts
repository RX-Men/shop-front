import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-router-link-demo',
  imports: [RouterLinkComponent, UiKitRowComponent],
  templateUrl: './router-link-demo.component.html',
  styleUrl: './router-link-demo.component.scss',
})
export class RouterLinkDemoComponent {}
