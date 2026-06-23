import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { LineItem } from '@commercetools/platform-sdk';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);

    fixture.componentRef.setInput('item', {
      id: '1',
      quantity: 1,
      name: {
        'en-US': 'Batman',
      },
      variant: {
        sku: 'batman-1',
        images: [],
      },
      totalPrice: {
        centAmount: 499,
      },
    } as unknown as LineItem);

    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
