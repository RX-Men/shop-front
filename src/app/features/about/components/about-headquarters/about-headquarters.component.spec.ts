import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutHeadquartersComponent } from './about-headquarters.component';

describe('AboutHeadquartersComponent', () => {
  let component: AboutHeadquartersComponent;
  let fixture: ComponentFixture<AboutHeadquartersComponent>;
  let componentRef: ComponentRef<AboutHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutHeadquartersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutHeadquartersComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('data', {
      title: 'Headquarters',
      address: {
        company: 'SF-Comics',
        street: '742 Evergreen Terrace',
        city: 'Springfield, OR 97477',
      },
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
