import { ExternalLinkComponent } from '@/app/shared/components/external-link';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import aboutData from '@/app/content/pages/about/about.json' with { type: 'json' };
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-company-info',
  imports: [ExternalLinkComponent],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
})
export class CompanyInfoComponent {
  readonly year: number = new Date().getFullYear();
  readonly data = aboutData;
}
