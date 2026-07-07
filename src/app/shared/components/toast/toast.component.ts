import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { IconComponent } from '../icon';
import { IconButtonComponent } from '../icon-button';

import toastContent from '@/app/content/shared/toast/toast.json' with { type: 'json' };

import type { IconName } from '../icon/icon.types';

import type { Toast } from './toast.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toast',
  imports: [IconComponent, IconButtonComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  readonly id = input.required<Toast['id']>();
  readonly heading = input.required<Toast['heading']>();
  readonly description = input<Toast['description']>();
  readonly status = input<Toast['status'] | undefined>('success');

  readonly closeChange = output<Toast['id']>();

  protected readonly _content = toastContent;

  protected readonly _icon = computed((): IconName => {
    switch (this.status()) {
      case 'error':
        return 'close';
      default:
        return 'check';
    }
  });
}
