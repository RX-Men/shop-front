import { CartService } from '@/app/core/services/cart.service';
import { CartItemComponent } from '@/app/features/cart/components/cart-item/cart-item.component';
import { MockCartService } from '@/app/features/cart/mocks/mock-cart.service';
import { ButtonComponent } from '@/app/shared/components/button';
import { EmptyComponent } from '@/app/shared/components/empty';
import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { PricePipe } from '@/app/shared/pipes/price';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  imports: [PricePipe, ButtonComponent, EmptyComponent, RouterLinkComponent, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [
    {
      provide: CartService,
      useClass: MockCartService,
    },
  ],
})
export class CartComponent {
  readonly cart = inject(CartService);
}
