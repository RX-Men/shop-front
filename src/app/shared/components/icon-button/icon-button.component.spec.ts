import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { vi } from 'vitest';

import { IconButtonComponent } from './icon-button.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let componentRef: ComponentRef<IconButtonComponent>;
  let componentElement: HTMLButtonElement | null;
  let fixture: ComponentFixture<IconButtonComponent>;

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('icon', 'person');
    componentRef.setInput('label', 'See user profile');

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.iconButton.root}"]`,
    );
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with a specific icon', () => {
    const useElement = componentElement?.querySelector('use');

    expect(useElement?.getAttribute('href')).toContain('#person');
  });

  it('should create with a specific aria-label attribute', () => {
    expect(componentElement?.getAttribute('aria-label')).toBe('See user profile');
  });

  it('should have a default type "button"', () => {
    expect(componentElement?.getAttribute('type')).toBe('button');
  });

  it('should have a default size class "m"', () => {
    const iconElement = componentElement?.querySelector(
      `[data-testid="${APP_TEST_IDS.icon.root}"]`,
    );

    expect(iconElement?.classList.contains('icon_size_m')).toBe(true);
  });

  it('should update symbol when name changes', () => {
    const useElement = componentElement?.querySelector('use');

    componentRef.setInput('icon', 'search');
    fixture.detectChanges();

    expect(useElement?.getAttribute('href')).toContain('#search');
  });

  it('should update type from button to submit', () => {
    componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    expect(componentElement?.getAttribute('type')).toBe('submit');
  });

  it('should update size class', () => {
    const iconElement = componentElement?.querySelector(
      `[data-testid="${APP_TEST_IDS.icon.root}"]`,
    );

    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(iconElement?.classList.contains('icon_size_l')).toBe(true);
  });

  it('should update aria-label attribute', () => {
    componentRef.setInput('label', 'Add to wishlist');
    fixture.detectChanges();

    expect(componentElement?.getAttribute('aria-label')).toBe('Add to wishlist');
  });

  it('should update aria-pressed attribute', () => {
    componentRef.setInput('ariaPressed', true);
    fixture.detectChanges();

    expect(componentElement?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should set disabled attribute', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(componentElement?.getAttribute('disabled')).toBe('');
  });

  it('should allow click event', () => {
    const fakeEvent = new Event('click');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    fixture.debugElement.triggerEventHandler('click', fakeEvent);

    expect(stopSpy).not.toHaveBeenCalled();
  });

  it('should allow keydown event', () => {
    const fakeEvent = new Event('keydown');
    const stopSpy = vi.spyOn(fakeEvent, 'stopPropagation');

    fixture.debugElement.triggerEventHandler('keydown', fakeEvent);

    expect(stopSpy).not.toHaveBeenCalled();
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

  it('should show tooltip on mouseenter', () => {
    componentElement?.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tooltipElement = overlayContainerElement.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );

    expect(tooltipElement).toBeTruthy();
  });

  it('should hide tooltip on mouseleave', () => {
    componentElement?.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    componentElement?.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    const tooltipElement = document.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );

    expect(tooltipElement).toBeNull();
  });

  it('should show tooltip on focus', () => {
    componentElement?.dispatchEvent(new KeyboardEvent('focus'));
    fixture.detectChanges();

    const tooltipElement = document.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );

    expect(tooltipElement).toBeTruthy();
  });

  it('should hide tooltip on blur', () => {
    componentElement?.dispatchEvent(new KeyboardEvent('focus'));
    fixture.detectChanges();

    componentElement?.dispatchEvent(new KeyboardEvent('blur'));
    fixture.detectChanges();

    const tooltipElement = document.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );

    expect(tooltipElement).toBeNull();
  });

  it('should set equal aria-label and tooltip content by the provided label', () => {
    componentElement?.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tooltipElement = overlayContainerElement.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );

    expect(componentElement?.getAttribute('aria-label')).toBe('See user profile');
    expect(tooltipElement?.textContent?.trim()).toBe('See user profile');
  });
});
