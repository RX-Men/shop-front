import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDemoComponent } from './carousel-demo.component';

describe('CarouselDemoComponent', () => {
  let component: CarouselDemoComponent;
  let fixture: ComponentFixture<CarouselDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
