import { ABOUT_CARDS } from '@/app/features/about/about.constants';
import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [TeammateCardComponent],
})
export class AboutComponent {
  readonly cards = ABOUT_CARDS;
}
