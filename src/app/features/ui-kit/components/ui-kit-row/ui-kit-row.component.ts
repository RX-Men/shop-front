import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Color, Direction } from './ui-kit-row.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit-row',
  templateUrl: './ui-kit-row.component.html',
  styleUrl: './ui-kit-row.component.scss',
})
export class UiKitRowComponent {
  readonly title = input<string>('');
  readonly direction = input<Direction>('row');
  readonly color = input<Color>('light');
}
