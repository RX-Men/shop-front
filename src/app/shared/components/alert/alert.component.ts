import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AlertType = 'error';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  readonly message = input.required<string>();
  readonly type = input<AlertType>('error');
}
