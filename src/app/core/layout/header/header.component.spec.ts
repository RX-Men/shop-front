import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AUTH_PROVIDER } from '@/app/core/providers/auth-provider';
import { CART_PROVIDER } from '@/app/core/providers/cart-provider';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
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

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
