import type { Inquiries } from '@/app/features/about/about.model';
import { ExternalLinkComponent } from '@/app/shared/components/external-link';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about-inquiries',
  templateUrl: './about-inquiries.component.html',
  imports: [ExternalLinkComponent],
})
export class AboutInquiriesComponent {
  readonly data = input.required<Inquiries>();
}
