import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: number): string | null {
    if (!Number.isSafeInteger(value) || value <= 0) {
      return null;
    }

    const whole = Math.floor(value / 100);
    const fraction = value % 100;

    return `$${whole}.${String(fraction).padStart(2, '0')}`;
  }
}
