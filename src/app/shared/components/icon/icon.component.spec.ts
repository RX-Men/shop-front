import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';

import { APP_TEST_IDS } from '../../../app.test-ids';

describe('IconComponent', () => {
  let component: IconComponent;
  let componentRef: ComponentRef<IconComponent>;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('name', 'person');
    await fixture.whenStable();
  });

  it('should create and have a specified icon', () => {
    const iconElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.icon.root}"]`,
    );
    const useElement = iconElement?.querySelector('use');

    expect(component).toBeTruthy();
    expect(iconElement).toBeTruthy();
    expect(useElement).toBeTruthy();
    expect(useElement?.getAttribute('href')).toContain('#person');
  });

  it('should update symbol when name changes', () => {
    const iconElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.icon.root}"]`,
    );
    const useElement = iconElement?.querySelector('use');

    componentRef.setInput('name', 'search');
    fixture.detectChanges();

    expect(useElement?.getAttribute('href')).toContain('#search');
  });

  it('should update size class', () => {
    const iconElement = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="icon"]',
    );

    expect(iconElement?.classList.contains('icon_size_m')).toBe(true);

    componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(iconElement?.classList.contains('icon_size_m')).toBe(false);
    expect(iconElement?.classList.contains('icon_size_l')).toBe(true);
  });
});
