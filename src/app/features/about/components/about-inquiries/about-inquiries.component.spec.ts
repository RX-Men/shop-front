import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInquiriesComponent } from './about-inquiries.component';

describe('AboutInquiriesComponent', () => {
  let component: AboutInquiriesComponent;
  let fixture: ComponentFixture<AboutInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutInquiriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutInquiriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
