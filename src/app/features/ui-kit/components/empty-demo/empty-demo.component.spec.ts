import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDemoComponent } from './empty-demo.component';

describe('EmptyDemoComponent', () => {
  let component: EmptyDemoComponent;
  let fixture: ComponentFixture<EmptyDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
