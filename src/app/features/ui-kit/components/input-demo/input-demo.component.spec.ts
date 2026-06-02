import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDemoComponent } from './input-demo.component';

describe('InputDemoComponent', () => {
  let component: InputDemoComponent;
  let fixture: ComponentFixture<InputDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
