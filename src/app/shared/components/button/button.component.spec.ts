import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ButtonComponent } from './button.component';

import { APP_TEST_IDS } from '../../../app.test-ids';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let componentRef: ComponentRef<ButtonComponent>;
  let componentElement: HTMLButtonElement | null;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.button.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have type "button" by default', () => {
    expect(componentElement?.getAttribute('type')).toBe('button');
  });

  it('should set specific type', () => {
    componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    expect(componentElement?.getAttribute('type')).toBe('submit');
  });

  it('should have variant "contained" by default', () => {
    expect(componentElement?.classList.contains('button_variant_contained')).toBe(true);
  });

  it('should set specific variant', () => {
    componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('button_variant_outlined')).toBe(true);
  });

  it('should have size "m" by default', () => {
    expect(componentElement?.classList.contains('button_size_m')).toBe(true);
  });

  it('should set specific size', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('button_size_l')).toBe(true);
  });

  it('should have color "brand" by default', () => {
    expect(componentElement?.classList.contains('button_color_brand')).toBe(true);
  });

  it('should set specific color', () => {
    componentRef.setInput('color', 'dark');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('button_color_dark')).toBe(true);
  });

  it('should create with a specific icon', () => {
    componentRef.setInput('icon', 'arrow-forward');
    fixture.detectChanges();

    const iconElement = componentElement?.querySelector(
      `[data-testid="${APP_TEST_IDS.icon.root}"]`,
    );
    const useElement = iconElement?.querySelector('use');

    expect(useElement?.getAttribute('href')).toContain('arrow-forward');
  });

  it('should set icon position', () => {
    componentRef.setInput('icon', 'arrow-forward');
    componentRef.setInput('iconPlacement', 'start');
    fixture.detectChanges();

    const contentElement = componentElement?.querySelector(
      `[data-testid="${APP_TEST_IDS.button.content}"]`,
    );

    expect(contentElement?.classList.contains('button__content_icon-placement_start')).toBe(true);
  });

  it('should set loading state with corresponding aria-attributes', () => {
    componentRef.setInput('loading', true);
    fixture.detectChanges();

    const loaderElement = componentElement?.querySelector(
      `[data-testid="${APP_TEST_IDS.spin.root}"]`,
    );

    expect(componentElement?.getAttribute('aria-busy')).toBe('true');
    expect(componentElement?.getAttribute('aria-disabled')).toBe('true');
    expect(loaderElement).toBeTruthy();
  });

  it('should set disabled attribute', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(componentElement?.getAttribute('disabled')).toBe('');
  });

  it('should allow click event', () => {
    const fakeEvent = new Event('click');
    const preventSpy = vi.spyOn(fakeEvent, 'preventDefault');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    fixture.debugElement.triggerEventHandler('click', fakeEvent);

    expect(preventSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });

  it('should allow keydown event', () => {
    const fakeEvent = new Event('keydown');
    const preventSpy = vi.spyOn(fakeEvent, 'preventDefault');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    fixture.debugElement.triggerEventHandler('keydown', fakeEvent);

    expect(preventSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });

  it('should not allow click event when loading', () => {
    const fakeEvent = new Event('click');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    componentRef.setInput('loading', true);
    fixture.detectChanges();
    fixture.debugElement.triggerEventHandler('click', fakeEvent);

    expect(stopSpy).toHaveBeenCalledOnce();
  });

  it('should not allow keydown event when loading', () => {
    const fakeEvent = new Event('keydown');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    componentRef.setInput('loading', true);
    fixture.detectChanges();
    fixture.debugElement.triggerEventHandler('keydown', fakeEvent);

    expect(stopSpy).toHaveBeenCalledOnce();
  });

  it('should not allow click event when disabled', () => {
    const fakeEvent = new Event('click');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.debugElement.triggerEventHandler('click', fakeEvent);

    expect(stopSpy).toHaveBeenCalledOnce();
  });

  it('should not allow keydown event when disabled', () => {
    const fakeEvent = new Event('keydown');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.debugElement.triggerEventHandler('keydown', fakeEvent);

    expect(stopSpy).toHaveBeenCalledOnce();
  });
});
