import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CarouselComponent } from '@/app/shared/components/carousel';
import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

interface CarouselDemoSlide {
  title: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel-demo',
  imports: [CarouselComponent, IconButtonComponent, UiKitRowComponent],
  templateUrl: './carousel-demo.component.html',
  styleUrl: './carousel-demo.component.scss',
})
export class CarouselDemoComponent {
  readonly slides: CarouselDemoSlide[] = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ];
}
