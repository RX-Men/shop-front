import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderRadiusDemoComponent } from './border-radius-demo.component';

describe('BorderRadiusDemoComponent', () => {
  let component: BorderRadiusDemoComponent;
  let fixture: ComponentFixture<BorderRadiusDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderRadiusDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BorderRadiusDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
