import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipComponent],
  template: ` <app-tooltip /> `,
})
class TestTooltipComponent {
  readonly _tooltiplEl = viewChild.required(TooltipComponent);

  readonly setText = (text: ReturnType<TooltipComponent['text']>): void =>
    this._tooltiplEl().setText(text);
  readonly setColor = (color: ReturnType<TooltipComponent['color']>): void =>
    this._tooltiplEl().setColor(color);
}

describe('TooltipComponent', () => {
  let component: TestTooltipComponent;
  let componentElement: HTMLDivElement | null;
  let fixture: ComponentFixture<TestTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTooltipComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    componentElement = (fixture.nativeElement as HTMLElement).querySelector(
      `[data-testid="${APP_TEST_IDS.tooltip.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text', () => {
    fixture.componentInstance.setText('Tooltip');
    fixture.detectChanges();
    expect(componentElement?.textContent?.trim()).toBe('Tooltip');
  });

  it('should have dark color by default', () => {
    expect(componentElement?.classList.contains('tooltip_color_dark')).toBe(true);
  });

  it('should set new color', () => {
    fixture.componentInstance.setColor('light');
    fixture.detectChanges();

    expect(componentElement?.classList.contains('tooltip_color_light')).toBe(true);
  });
});
