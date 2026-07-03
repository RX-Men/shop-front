import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceComponent } from './price.component';

describe('PriceComponent', () => {
  let component: PriceComponent;
  let componentRef: ComponentRef<PriceComponent>;
  let fixture: ComponentFixture<PriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('currentPrice', 2500);
    componentRef.setInput('oldPrice', 5000);
    componentRef.setInput('discount', 50);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
