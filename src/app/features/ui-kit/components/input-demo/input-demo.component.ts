import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputComponent } from '@/app/shared/components/input';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-demo',
  imports: [InputComponent],
  templateUrl: './input-demo.component.html',
  styleUrl: './input-demo.component.scss',
})
export class InputDemoComponent {
  value = 'edit me';
}
