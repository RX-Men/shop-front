import { ABOUT_CARDS } from '@/app/features/about/about.constants';
import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import aboutData from './about.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [TeammateCardComponent, RouterLink],
})
export class AboutComponent {
  readonly cards = ABOUT_CARDS;
  readonly currentYear: number = new Date().getFullYear();
  readonly info = aboutData;
}
