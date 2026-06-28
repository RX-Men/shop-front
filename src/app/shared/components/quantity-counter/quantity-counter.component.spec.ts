import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityCounterComponent } from './quantity-counter.component';

describe('QuantityCounterComponent', () => {
  let component: QuantityCounterComponent;
  let fixture: ComponentFixture<QuantityCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityCounterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 1);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
