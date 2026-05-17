import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkComponent } from './external-link.component';

import { APP_TEST_IDS } from '../../../app.test-ids';

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let componentRef: ComponentRef<ExternalLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<ExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('href', 'https://github.com');

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.externalLink.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set href with default target and rel attributes', () => {
    expect(componentElement?.getAttribute('href')).toBe('https://github.com');
    expect(componentElement?.getAttribute('target')).toBe('_blank');
    expect(componentElement?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have variant "contained" by default', () => {
    expect(componentElement?.classList.contains('external-link_variant_contained')).toBe(true);
  });

  it('should set specific variant', () => {
    componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('external-link_variant_outlined')).toBe(true);
  });

  it('should have size "m" by default', () => {
    expect(componentElement?.classList.contains('external-link_size_m')).toBe(true);
  });

  it('should set specific size', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('external-link_size_l')).toBe(true);
  });

  it('should have color "brand" by default', () => {
    expect(componentElement?.classList.contains('external-link_color_brand')).toBe(true);
  });

  it('should set specific color', () => {
    componentRef.setInput('color', 'dark');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('external-link_color_dark')).toBe(true);
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

    expect(componentElement?.classList.contains('external-link_icon-placement_start')).toBe(true);
  });
});
