import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import { SpinComponent } from './spin.component';

describe('SpinComponent', () => {
  let component: SpinComponent;
  let componentRef: ComponentRef<SpinComponent>;
  let fixture: ComponentFixture<SpinComponent>;
  let spinElement: HTMLElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    await fixture.whenStable();

    spinElement = fixture.nativeElement.querySelector(`[data-testid="${APP_TEST_IDS.spin.root}"]`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default size class', () => {
    const spinnerElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.spin.spinner}"]`,
    );

    expect(spinnerElement?.classList.contains('spin__spinner_size_m')).toBe(true);
  });

  it('should render with default color class', () => {
    expect(spinElement?.classList.contains('spin_color_current')).toBe(true);
  });

  it('should set size class', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.spin.spinner}"]`,
    );

    expect(spinnerElement?.classList.contains('spin__spinner_size_l')).toBe(true);
  });

  it('should set color class', () => {
    componentRef.setInput('color', 'brand');
    fixture.detectChanges();

    expect(spinElement?.classList.contains('spin_color_brand')).toBe(true);
  });

  it('should expose status role', () => {
    expect(spinElement?.getAttribute('role')).toBe('status');
  });

  it('should hide description by default', () => {
    const descriptionElement = spinElement?.querySelector('.spin__description');

    expect(descriptionElement?.classList.contains('spin__description_hidden')).toBe(true);
  });

  it('should show description when enabled', () => {
    componentRef.setInput('withDescription', true);
    fixture.detectChanges();

    const descriptionElement = spinElement?.querySelector('.spin__description');

    expect(descriptionElement?.classList.contains('spin__description_hidden')).toBe(false);
  });
});
