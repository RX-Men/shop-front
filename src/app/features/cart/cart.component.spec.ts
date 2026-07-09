import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart.component';
import { AUTH_PROVIDER } from '@/app/core/providers/auth-provider';
import { CART_PROVIDER } from '@/app/core/providers/cart-provider';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const cartProviderMock = {
    project: vi.fn().mockReturnValue({
      me: vi.fn().mockReturnValue({
        activeCart: vi.fn().mockReturnValue({
          get: vi.fn().mockReturnValue({
            execute: vi.fn().mockResolvedValue({
              body: {
                lineItems: [],
                totalPrice: { centAmount: 0 },
              },
            }),
          }),
        }),
      }),
    }),
  };
  beforeEach(async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AUTH_PROVIDER,
          useValue: {
            project: vi.fn(),
            initPasswordClient: vi.fn(),
            initAnonymousClient: vi.fn(),
            initRefreshTokenClient: vi.fn(),
          },
        },
        {
          provide: CART_PROVIDER,
          useValue: cartProviderMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
