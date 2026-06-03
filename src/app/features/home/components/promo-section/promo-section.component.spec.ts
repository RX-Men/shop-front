import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PromoSectionComponent } from './promo-section.component';

describe('PromoSectionComponent', () => {
  let component: PromoSectionComponent;
  let componentRef: ComponentRef<PromoSectionComponent>;
  let fixture: ComponentFixture<PromoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoSectionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoSectionComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('title', 'New on Marvel Unlimited');
    componentRef.setInput('subtitle', 'Available Now');
    componentRef.setInput(
      'description',
      'Read these plus 30,000+ digital comics for $9.99 a month!',
    );
    componentRef.setInput('imgSrc', 'assets/images/20250331_newtomu_base_set_dsk.jpg');
    componentRef.setInput('link', 'Get Marvel unlimited');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
