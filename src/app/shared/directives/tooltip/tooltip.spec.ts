import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective],
  template: `<div appTooltip="Test message" tooltipText="Tooltip">Hover me</div>`,
})
class TestComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveInstance: TooltipDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TooltipDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directiveElement = fixture.debugElement.query(By.directive(TooltipDirective));
    directiveInstance = directiveElement.injector.get(TooltipDirective);
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });
});
