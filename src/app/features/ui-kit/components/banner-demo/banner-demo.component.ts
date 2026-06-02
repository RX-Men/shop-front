import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BannerComponent } from '@/app/shared/components/banner';
import { ButtonComponent } from '@/app/shared/components/button';
import { UiKitRowComponent } from '../ui-kit-row/ui-kit-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-banner-demo',
  imports: [BannerComponent, ButtonComponent, UiKitRowComponent],
  templateUrl: './banner-demo.component.html',
})
export class BannerDemoComponent {}
