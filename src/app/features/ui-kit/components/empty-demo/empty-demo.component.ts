import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EmptyComponent } from '@/app/shared/components/empty';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-empty-demo',
  imports: [EmptyComponent, UiKitRowComponent],
  templateUrl: './empty-demo.component.html',
  styleUrl: './empty-demo.component.scss',
})
export class EmptyDemoComponent {}
