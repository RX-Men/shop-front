import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKitSectionComponent } from './ui-kit-section.component';

describe('UiKitSectionComponent', () => {
  let component: UiKitSectionComponent;
  let fixture: ComponentFixture<UiKitSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiKitSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiKitSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
