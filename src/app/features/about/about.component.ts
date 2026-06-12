import { AboutCompanyComponent } from '@/app/features/about/components/about-company/about-company.component';
// eslint-disable-next-line max-len
import { AboutHeadquartersComponent } from '@/app/features/about/components/about-headquarters/about-headquarters.component';
import { AboutInquiriesComponent } from '@/app/features/about/components/about-inquiries/about-inquiries.component';
import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import aboutData from '../../content/pages/about/about.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [
    TeammateCardComponent,
    AboutCompanyComponent,
    AboutHeadquartersComponent,
    AboutInquiriesComponent,
  ],
})
export class AboutComponent {
  readonly currentYear: number = new Date().getFullYear();
  readonly info = aboutData;
}
