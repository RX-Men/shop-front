import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_TEST_IDS } from '../../../app.test-ids';

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

  it('should render with default size and color classes', () => {
    expect(spinElement?.classList.contains('spin_size_m')).toBe(true);
    expect(spinElement?.classList.contains('spin_color_current')).toBe(true);
  });

  it('should set size class', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(spinElement?.classList.contains('spin_size_l')).toBe(true);
  });

  it('should set color class', () => {
    componentRef.setInput('color', 'brand');
    fixture.detectChanges();

    expect(spinElement?.classList.contains('spin_color_brand')).toBe(true);
  });

  it('should be hidden from accessibility tree', () => {
    expect(spinElement?.getAttribute('aria-hidden')).toBe('true');
  });
});
