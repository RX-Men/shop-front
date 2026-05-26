import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerControlComponent } from './picker-control.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('PickerControlComponent', () => {
  let component: PickerControlComponent;
  let componentRef: ComponentRef<PickerControlComponent>;
  let componentElement: HTMLButtonElement | null;
  let fixture: ComponentFixture<PickerControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PickerControlComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('ariaLabel', 'Slide 1');

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.pickerControl.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the provided aria-label attribute', () => {
    expect(componentElement?.getAttribute('aria-label')).toBe('Slide 1');
  });

  it('should not have aria-disabled attribute by default', () => {
    expect(componentElement?.getAttribute('aria-disabled')).toBeNull();
  });

  it('should set aria-disabled attribute when active is true', () => {
    componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(componentElement?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have active class by default', () => {
    expect(componentElement?.classList.contains('picker-control_active')).toBe(false);
  });

  it('should have active class when active is true', () => {
    componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(componentElement?.classList.contains('picker-control_active')).toBe(true);
  });
});
