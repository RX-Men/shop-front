import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKitRowComponent } from './ui-kit-row.component';

describe('UiKitRowComponent', () => {
  let component: UiKitRowComponent;
  let fixture: ComponentFixture<UiKitRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiKitRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiKitRowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
