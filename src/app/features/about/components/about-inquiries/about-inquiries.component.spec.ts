import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutInquiriesComponent } from './about-inquiries.component';

describe('AboutInquiriesComponent', () => {
  let component: AboutInquiriesComponent;
  let fixture: ComponentFixture<AboutInquiriesComponent>;
  let componentRef: ComponentRef<AboutInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutInquiriesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutInquiriesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('data', {
      title: 'Inquiries',
      phone: '555-0199',
      label: 'Phone: ',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
