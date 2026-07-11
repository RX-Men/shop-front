import { ProductDetailService } from '@/app/core/services/product-detail/product-detail.service';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let componentRef: ComponentRef<ProductDetailComponent>;
  let fixture: ComponentFixture<ProductDetailComponent>;
  const productDetailServiceMock = {
    product: vi.fn(() => null),
    quantity: vi.fn(() => 1),
    fetchProduct: vi.fn(),
    resetData: vi.fn(),
    changeQuantity: vi.fn(),
    addToCart: vi.fn(),

    loading: vi.fn(() => ({
      main: false,
    })),

    error: vi.fn(() => ({
      notFound: false,
    })),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ProductDetailService,
          useValue: productDetailServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('productId', '1');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
