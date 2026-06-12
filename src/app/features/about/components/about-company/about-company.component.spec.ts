import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutCompanyComponent } from './about-company.component';

describe('AboutCompanyComponent', () => {
  let component: AboutCompanyComponent;
  let fixture: ComponentFixture<AboutCompanyComponent>;
  let componentRef: ComponentRef<AboutCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutCompanyComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('data', {
      title: 'Test Title',
      description: 'Test Description',
      copyright: 'Test Brand',
    });
    componentRef.setInput('year', 2026);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
