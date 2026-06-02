import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsDemoComponent } from './colors-demo.component';

describe('ColorsDemoComponent', () => {
  let component: ColorsDemoComponent;
  let fixture: ComponentFixture<ColorsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
