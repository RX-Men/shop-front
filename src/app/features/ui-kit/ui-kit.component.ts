import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputDemoComponent } from './components/input-demo/input-demo.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit',
  imports: [InputDemoComponent],
  templateUrl: './ui-kit.component.html',
  styleUrl: './ui-kit.component.scss',
})
export class UiKitComponent {}
