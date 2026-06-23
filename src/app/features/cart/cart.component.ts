import { CartService } from '@/app/core/services/cart.service';
import { ButtonComponent } from '@/app/shared/components/button';
import { EmptyComponent } from '@/app/shared/components/empty';
import { IconButtonComponent } from '@/app/shared/components/icon-button';
import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { PricePipe } from '@/app/shared/pipes/price';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  imports: [
    IconButtonComponent,
    PricePipe,
    ButtonComponent,
    EmptyComponent,
    RouterLinkComponent,
    NgOptimizedImage,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cart = inject(CartService);
}
