import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinDemoComponent } from './spin-demo.component';

describe('SpinDemoComponent', () => {
  let component: SpinDemoComponent;
  let fixture: ComponentFixture<SpinDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
