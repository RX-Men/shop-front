import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { IconExternalLinkComponent } from './icon-external-link.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

describe('IconExternalLinkComponent', () => {
  let component: IconExternalLinkComponent;
  let componentRef: ComponentRef<IconExternalLinkComponent>;
  let componentElement: HTMLAnchorElement | null;
  let fixture: ComponentFixture<IconExternalLinkComponent>;

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconExternalLinkComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(IconExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('icon', 'github');
    componentRef.setInput('href', 'github');
    componentRef.setInput('label', 'Go to github');

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.iconExternalLink.root}"]`,
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

    expect(componentElement?.getAttribute('aria-label')).toBe('Go to github');
    expect(tooltipElement?.textContent?.trim()).toBe('Go to github');
  });
});
