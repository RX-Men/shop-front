import { ButtonComponent } from '@/app/shared/components/button';
import { ExternalLinkComponent } from '@/app/shared/components/external-link';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-teammate-card',
  imports: [NgOptimizedImage, ExternalLinkComponent, ButtonComponent],
  templateUrl: './teammate-card.component.html',
  styleUrl: './teammate-card.component.scss',
})
export class TeammateCardComponent {
  readonly name = input.required<string>();
  readonly role = input.required<string>();
  readonly description = input.required<string>();
  readonly promoCode = input.required<string>();
  readonly imgSrc = input.required<string>();
  readonly linkHref = input.required<string>();
  isCollapsed = true;
}
