import type { Headquarters } from '@/app/features/about/about.model';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about-headquarters',
  templateUrl: './about-headquarters.component.html',
})
export class AboutHeadquartersComponent {
  readonly data = input.required<Headquarters>();
}
