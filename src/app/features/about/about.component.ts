import { CompanyInfoComponent } from '@/app/features/about/components/company-info/company-info.component';
import { DevelopmentTeamComponent } from '@/app/features/about/components/development-team/development-team.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [CompanyInfoComponent, DevelopmentTeamComponent],
})
export class AboutComponent {}
