import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { SkeletonTheme } from './skeleton.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  readonly loading = input<boolean>();
  readonly width = input<CSSStyleDeclaration['width']>();
  readonly height = input<CSSStyleDeclaration['height']>();
  readonly theme = input<SkeletonTheme>('dark');
}
