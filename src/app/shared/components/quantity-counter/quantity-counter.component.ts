import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-quantity-counter',
  imports: [IconButtonComponent],
  templateUrl: './quantity-counter.component.html',
  styleUrl: './quantity-counter.component.scss',
})
export class QuantityCounterComponent {
  readonly value = input.required<number>();

  readonly increase = output<void>();
  readonly decrease = output<void>();
}
