import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCardComponent } from './product-card.component';

import { PricePipe } from '@/app/shared/pipes/price';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { ROUTES } from '@/app/core/constants/routes';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let componentElement: HTMLElement | null;
  let componentRef: ComponentRef<ProductCardComponent>;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, PricePipe],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('id', '1');
    componentRef.setInput('heading', 'Batman (2002) #608');
    componentRef.setInput('subheading', 'DC Comics');
    componentRef.setInput('img', 'http://mock.com/images/portrait_uncanny.jpg');
    componentRef.setInput('currentPrice', 2500);
    componentRef.setInput('oldPrice', 2500);
    componentRef.setInput('discount', 0);
    componentRef.setInput('count', 15);
    componentRef.setInput('sku', 'SKU-123');
    componentRef.setInput('detailsLink', 'catalog/1');

    await fixture.whenStable();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.productCard.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have provided heading', () => {
    const headingEl = componentElement?.querySelector<HTMLHeadingElement>(
      `[data-testid="${APP_TEST_IDS.productCard.heading}"]`,
    );

    expect(headingEl?.textContent?.trim()).toBe('Batman (2002) #608');
  });

  it('should have provided subheading', () => {
    const subheadingEl = componentElement?.querySelector<HTMLParagraphElement>(
      `[data-testid="${APP_TEST_IDS.productCard.subheading}"]`,
    );

    expect(subheadingEl?.textContent?.trim()).toBe('DC Comics');
  });

  it('should have provided img with default alt attribute', () => {
    const imgEl = componentElement?.querySelector<HTMLImageElement>(
      `[data-testid="${APP_TEST_IDS.productCard.img}"]`,
    );

    expect(imgEl?.src?.trim()).toBe('http://mock.com/images/portrait_uncanny.jpg');
    expect(imgEl?.alt).toBe('Cover');
  });

  it('should have provided "tab-index" attribute inside interactive elements', () => {
    componentRef.setInput('tabIndex', -1);
    fixture.detectChanges();

    const headingLinkEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.productCard.headingLink}"]`,
    );
    const buttonEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.button.root}"]`,
    );

    expect(headingLinkEl?.getAttribute('tabindex')).toBe('-1');
    expect(buttonEl?.getAttribute('tabindex')).toBe('-1');
  });

  it('should have provided formatted current price', () => {
    const currentPriceEl = componentElement?.querySelector<HTMLParagraphElement>(
      `[data-testid="${APP_TEST_IDS.price.currentPrice}"]`,
    );

    expect(currentPriceEl?.textContent?.trim()).toBe('$25.00');
  });

  it('should not have old price without discount', () => {
    const oldPriceEl = componentElement?.querySelector<HTMLParagraphElement>(
      `[data-testid="${APP_TEST_IDS.price.oldPrice}"]`,
    );

    expect(oldPriceEl).toBeNull();
  });

  it('should have formatted old price if there is a discount', () => {
    componentRef.setInput('oldPrice', 5000);
    componentRef.setInput('discount', 50);
    fixture.detectChanges();

    const oldPriceEl = componentElement?.querySelector<HTMLParagraphElement>(
      `[data-testid="${APP_TEST_IDS.price.oldPrice}"]`,
    );

    expect(oldPriceEl).toBeTruthy();
    expect(oldPriceEl?.textContent?.trim()).toBe('$50.00');
  });

  it('should have correct link to product page', () => {
    const headingLinkEl = componentElement?.querySelector<HTMLAnchorElement>(
      `[data-testid="${APP_TEST_IDS.productCard.headingLink}"]`,
    );

    expect(headingLinkEl?.getAttribute('href')).toBe(`/${ROUTES.catalog}/1`);
  });

  it('should set "aria-label" attribute with current price, if there is no discount', () => {
    const priceEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.price.root}"]`,
    );

    expect(priceEl?.getAttribute('aria-label')).toBe('Price is $25.00');
  });

  it('should set "aria-label" attribute with current and old price, if there is discount', () => {
    componentRef.setInput('oldPrice', 5000);
    componentRef.setInput('discount', 50);
    fixture.detectChanges();

    const priceEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.price.root}"]`,
    );

    expect(priceEl?.getAttribute('aria-label')).toBe('Now is $25.00. Original price is $50.00');
  });

  it('should not show badge by default', () => {
    const badgeEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.productBadge.root}"]`,
    );

    expect(badgeEl).toBeNull();
  });

  it('should show badge with "Sold out" text, if count is 0', () => {
    componentRef.setInput('count', 0);
    fixture.detectChanges();

    const badgeEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.productBadge.root}"]`,
    );

    expect(badgeEl?.textContent).toBe('Sold out');
  });

  it('should show badge with warning of small product amount, if count is less than 6', () => {
    componentRef.setInput('count', 5);
    fixture.detectChanges();

    const badgeEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.productBadge.root}"]`,
    );

    expect(badgeEl?.textContent).toBe('5 left');
  });

  it('should show badge with "discount" text, if there is a discount', () => {
    componentRef.setInput('discount', 50);
    fixture.detectChanges();

    const badgeEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.productBadge.root}"]`,
    );

    expect(badgeEl?.textContent).toBe('50% off');
  });

  it('should disable cart button, if product is out', () => {
    componentRef.setInput('count', 0);
    fixture.detectChanges();

    const buttonEl = componentElement?.querySelector<HTMLButtonElement>(
      `[data-testid="${APP_TEST_IDS.button.root}"]`,
    );

    expect(buttonEl?.getAttribute('disabled')).toBe('');
  });

  it('should set "aria-hidden" attribute for current and old price for a11y', () => {
    componentRef.setInput('oldPrice', 5000);
    componentRef.setInput('discount', 50);
    fixture.detectChanges();

    const oldPriceEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.price.oldPrice}"]`,
    );
    const currentPriceEl = componentElement?.querySelector<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.price.currentPrice}"]`,
    );

    expect(oldPriceEl?.getAttribute('aria-hidden')).toBe('true');
    expect(currentPriceEl?.getAttribute('aria-hidden')).toBe('true');
  });
});
