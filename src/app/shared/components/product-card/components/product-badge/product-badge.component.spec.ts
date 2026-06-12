import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBadgeComponent } from './product-badge.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('BadgeComponent', () => {
  let component: ProductBadgeComponent;
  let componentRef: ComponentRef<ProductBadgeComponent>;
  let componentElement: HTMLDivElement | null;
  let fixture: ComponentFixture<ProductBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.productBadge.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have status "active" by default', () => {
    expect(componentElement?.classList.contains('product-badge_status_active')).toBe(true);
  });

  it('should set new status', () => {
    componentRef.setInput('status', 'disabled');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('product-badge_status_disabled')).toBe(true);
  });
});
