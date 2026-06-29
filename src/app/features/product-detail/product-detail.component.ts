import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RouterLinkComponent } from '@/app/shared/components/router-link';

import { ROUTES } from '@/app/core/constants/routes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-detail',
  imports: [RouterLinkComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  readonly productId = input.required<string>();

  protected readonly _routes = ROUTES;
}
