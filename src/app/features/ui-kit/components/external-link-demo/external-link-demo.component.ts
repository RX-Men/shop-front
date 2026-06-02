import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExternalLinkComponent } from '@/app/shared/components/external-link';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-external-link-demo',
  imports: [ExternalLinkComponent, UiKitRowComponent],
  templateUrl: './external-link-demo.component.html',
  styleUrl: './external-link-demo.component.scss',
})
export class ExternalLinkDemoComponent {}
