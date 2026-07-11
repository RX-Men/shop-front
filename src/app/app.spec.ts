import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AUTH_PROVIDER } from '@/app/core/providers/auth-provider';
import { CART_PROVIDER } from '@/app/core/providers/cart-provider';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
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
          useValue: {
            project: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
