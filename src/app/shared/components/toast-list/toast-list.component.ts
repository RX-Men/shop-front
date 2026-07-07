import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

import { type Toast, ToastComponent } from '../toast';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toast-list',
  imports: [ToastComponent],
  templateUrl: './toast-list.component.html',
  styleUrl: './toast-list.component.scss',
})
export class ToastListComponent {
  readonly items = input<Toast[]>([]);

  readonly closeChange = output<Toast['id']>();
}
