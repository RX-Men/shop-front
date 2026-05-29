import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductListComponent } from './product-list.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let componentRef: ComponentRef<ProductListComponent>;
  let componentElement: HTMLElement | null;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('title', 'Products');
    componentRef.setInput('products', []);

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.productList.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set provided title', () => {
    const titleEl = componentElement?.querySelector<HTMLHeadingElement>(
      `[data-testid="${APP_TEST_IDS.productList.title}"]`,
    );

    expect(titleEl?.textContent?.trim()).toBe('Products');
  });
});
