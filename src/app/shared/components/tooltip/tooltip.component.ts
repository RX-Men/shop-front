import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { TooltipColor } from './tooltip.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  readonly text = signal<string>('');
  readonly color = signal<TooltipColor>('dark');

  protected readonly _testIds = APP_TEST_IDS.tooltip;

  readonly setText = (text: string): void => {
    this.text.set(text);
  };

  readonly setColor = (color: TooltipColor): void => {
    this.color.set(color);
  };
}
