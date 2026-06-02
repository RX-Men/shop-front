import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDemoComponent } from './icon-demo.component';

describe('IconDemoComponent', () => {
  let component: IconDemoComponent;
  let fixture: ComponentFixture<IconDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
