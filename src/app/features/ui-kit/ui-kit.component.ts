import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BannerDemoComponent } from './components/banner-demo';
import { BorderRadiusDemoComponent } from './components/border-radius-demo';
import { ButtonDemoComponent } from './components/button-demo';
import { CarouselDemoComponent } from './components/carousel-demo';
import { CheckboxDemoComponent } from './components/checkbox-demo';
import { ColorsDemoComponent } from './components/colors-demo';
import { EmptyDemoComponent } from './components/empty-demo';
import { ExternalLinkDemoComponent } from './components/external-link-demo';
import { IconButtonDemoComponent } from './components/icon-button-demo';
import { IconDemoComponent } from './components/icon-demo';
import { IconExternalLinkDemoComponent } from './components/icon-external-link-demo';
import { IconRouterLinkDemoComponent } from './components/icon-router-link-demo';
import { InputDemoComponent } from './components/input-demo';
import { RouterLinkDemoComponent } from './components/router-link-demo';
import { SpinDemoComponent } from './components/spin-demo';
import { TypographyDemoComponent } from './components/typography-demo';
import { UiKitSectionComponent } from './components/ui-kit-section/ui-kit-section.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit',
  imports: [
    BannerDemoComponent,
    BorderRadiusDemoComponent,
    ButtonDemoComponent,
    CarouselDemoComponent,
    CheckboxDemoComponent,
    ColorsDemoComponent,
    EmptyDemoComponent,
    ExternalLinkDemoComponent,
    IconButtonDemoComponent,
    IconDemoComponent,
    IconExternalLinkDemoComponent,
    IconRouterLinkDemoComponent,
    InputDemoComponent,
    RouterLinkDemoComponent,
    SpinDemoComponent,
    TypographyDemoComponent,
    UiKitSectionComponent,
  ],
  templateUrl: './ui-kit.component.html',
  styleUrl: './ui-kit.component.scss',
})
export class UiKitComponent {}
