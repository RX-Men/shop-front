import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { IconRouterLinkComponent } from './icon-router-link.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('IconRouterLinkComponent', () => {
  let component: IconRouterLinkComponent;
  let componentRef: ComponentRef<IconRouterLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<IconRouterLinkComponent>;

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconRouterLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(IconRouterLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('icon', 'shopping-cart');
    componentRef.setInput('routerLink', 'cart');
    componentRef.setInput('label', 'Go to cart page');

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.iconRouterLink.root}"]`,
    );
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default size class "m"', () => {
    const svgElement = componentElement?.querySelector(`[data-testid="${APP_TEST_IDS.icon.root}"]`);

    expect(svgElement?.classList.contains('icon_size_m')).toBe(true);
  });

  it('should render the provided icon', () => {
    const useElement = componentElement?.querySelector('use');

    expect(useElement?.getAttribute('href')).toContain('shopping-cart');
  });

  it('should set the correct href attribute based on routerLink', () => {
    expect(componentElement?.getAttribute('href')).toBe('/cart');
  });

  it('should set the provided aria-label attribute', () => {
    expect(componentElement?.getAttribute('aria-label')).toBe('Go to cart page');
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

    expect(componentElement?.getAttribute('aria-label')).toBe('Go to cart page');
    expect(tooltipElement?.textContent?.trim()).toBe('Go to cart page');
  });
});
