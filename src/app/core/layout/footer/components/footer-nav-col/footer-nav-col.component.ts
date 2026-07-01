import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ExternalLinkComponent } from '@/app/shared/components/external-link';
import { IconExternalLinkComponent } from '@/app/shared/components/icon-external-link';
import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { FOOTER_LINK_VARIANT } from '@/app/content/layout/footer/footer.model';

import type { FooterLink } from '@/app/content/layout/footer/footer.model';
import type { Direction } from './footer-nav-col.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer-nav-col',
  imports: [
    ExternalLinkComponent,
    IconExternalLinkComponent,
    NgTemplateOutlet,
    RouterLinkComponent,
  ],
  templateUrl: './footer-nav-col.component.html',
  styleUrl: './footer-nav-col.component.scss',
})
export class FooterNavColComponent {
  readonly title = input.required<string>();
  readonly links = input.required<FooterLink[]>();
  readonly direction = input<Direction>('col');

  protected readonly _id = crypto.randomUUID();
  protected readonly _linkVariant = FOOTER_LINK_VARIANT;
}
