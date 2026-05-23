import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExternalLinkComponent } from './icon-external-link.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('IconExternalLinkComponent', () => {
  let component: IconExternalLinkComponent;
  let componentRef: ComponentRef<IconExternalLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<IconExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconExternalLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('icon', 'github');
    componentRef.setInput('href', 'github');
    componentRef.setInput('ariaLabel', 'Go to github');

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.iconExternalLink.root}"]`,
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

    expect(useElement?.getAttribute('href')).toContain('github');
  });

  it('should set href with default target and rel attributes', () => {
    expect(componentElement?.getAttribute('href')).toBe('github');
    expect(componentElement?.getAttribute('target')).toBe('_blank');
    expect(componentElement?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should set the provided aria-label attribute', () => {
    expect(componentElement?.getAttribute('aria-label')).toBe('Go to github');
  });
});
