import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputDemoComponent } from './components/input-demo/input-demo.component';
import { UiKitSectionComponent } from './components/ui-kit-section/ui-kit-section.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit',
  imports: [UiKitSectionComponent, InputDemoComponent],
  templateUrl: './ui-kit.component.html',
  styleUrl: './ui-kit.component.scss',
})
export class UiKitComponent {}
