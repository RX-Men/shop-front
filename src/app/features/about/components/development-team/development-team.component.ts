import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import aboutData from '@/app/content/pages/about/about.json' with { type: 'json' };
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-development-team',
  imports: [TeammateCardComponent],
  templateUrl: './development-team.component.html',
  styleUrl: './development-team.component.scss',
})
export class DevelopmentTeamComponent {
  readonly info = aboutData;
}
