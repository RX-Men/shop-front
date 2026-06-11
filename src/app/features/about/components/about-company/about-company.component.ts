import type { CompanyInfo } from '@/app/features/about/about.model';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
})
export class AboutCompanyComponent {
  readonly data = input.required<CompanyInfo>();
  readonly year = input.required<number>();
}
