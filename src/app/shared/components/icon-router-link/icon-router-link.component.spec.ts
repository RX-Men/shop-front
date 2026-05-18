import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRouterLinkComponent } from './icon-router-link.component';

import { APP_TEST_IDS } from '../../../app.test-ids';

describe('IconRouterLinkComponent', () => {
  let component: IconRouterLinkComponent;
  let componentRef: ComponentRef<IconRouterLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<IconRouterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconRouterLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(IconRouterLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('icon', 'shopping-cart');
    componentRef.setInput('routerLink', 'cart');
    componentRef.setInput('ariaLabel', 'Go to cart page');

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.iconRouterLink.root}"]`,
    );
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
});
