import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHeadquartersComponent } from './about-headquarters.component';

describe('AboutHeadquartersComponent', () => {
  let component: AboutHeadquartersComponent;
  let fixture: ComponentFixture<AboutHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHeadquartersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHeadquartersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
