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

  readonly quantityChange = output<number>();
  readonly max = input<number>(10);
  readonly disabled = input(false);
  increase(): void {
    const value = this.value();
    if (value >= this.max()) {
      return;
    }
    this.quantityChange.emit(value + 1);
  }

  decrease(): void {
    const value = this.value();
    if (value <= 1) {
      return;
    }
    this.quantityChange.emit(value - 1);
  }
}
