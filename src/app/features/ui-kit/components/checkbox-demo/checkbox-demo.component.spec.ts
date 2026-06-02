import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CheckboxDemoComponent } from './checkbox-demo.component';

describe('CheckboxDemoComponent', () => {
  let component: CheckboxDemoComponent;
  let fixture: ComponentFixture<CheckboxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxDemoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
