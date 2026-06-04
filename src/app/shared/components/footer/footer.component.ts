import { ChangeDetectionStrategy, Component } from '@angular/core';

import { footerContent } from '@/app/content/layout/footer/footer.model';

import { FooterNavColComponent } from './components/footer-nav-col';
import { LogoComponent } from '../logo';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  imports: [FooterNavColComponent, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly _data = footerContent;
  protected readonly _testIds = APP_TEST_IDS.footer;
}
