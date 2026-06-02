import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonDemoComponent } from './icon-button-demo.component';

describe('IconButtonDemoComponent', () => {
  let component: IconButtonDemoComponent;
  let fixture: ComponentFixture<IconButtonDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
