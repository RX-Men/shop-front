import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoComponent } from './company-info.component';

describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent;
  let fixture: ComponentFixture<CompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
