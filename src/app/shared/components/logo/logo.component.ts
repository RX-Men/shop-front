import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LOGO_HEIGHT, LOGO_WIDTH } from './logo.constants';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo',
  imports: [NgOptimizedImage, NgTemplateOutlet, RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  readonly imgPriority = input<boolean>(true);
  readonly linkable = input<boolean>(true);

  protected readonly _width = LOGO_WIDTH;
  protected readonly _height = LOGO_HEIGHT;

  protected readonly _testIds = APP_TEST_IDS.logo;
}
