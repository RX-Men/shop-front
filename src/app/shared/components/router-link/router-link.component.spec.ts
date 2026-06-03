import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RouterLinkComponent } from './router-link.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('RouterLinkComponent', () => {
  let component: RouterLinkComponent;
  let componentRef: ComponentRef<RouterLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<RouterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RouterLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('routerLink', 'cart');

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.routerLink.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct href attribute based on routerLink', () => {
    expect(componentElement?.getAttribute('href')).toBe('/cart');
  });

  it('should have variant "contained" by default', () => {
    expect(componentElement?.classList.contains('router-link_variant_contained')).toBe(true);
  });

  it('should set specific variant', () => {
    componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('router-link_variant_outlined')).toBe(true);
  });

  it('should have size "m" by default', () => {
    expect(componentElement?.classList.contains('router-link_size_m')).toBe(true);
  });

  it('should set specific size', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('router-link_size_l')).toBe(true);
  });

  it('should have color "brand" by default', () => {
    expect(componentElement?.classList.contains('router-link_color_brand')).toBe(true);
  });

  it('should set specific color', () => {
    componentRef.setInput('color', 'dark');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('router-link_color_dark')).toBe(true);
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

    expect(componentElement?.classList.contains('router-link_icon-placement_start')).toBe(true);
  });

  it('should set tabindex attribute', () => {
    componentRef.setInput('tabIndex', -1);
    fixture.detectChanges();

    expect(componentElement?.getAttribute('tabindex')).toBe('-1');
  });
});
