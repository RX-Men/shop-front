import { ComponentRef } from '@angular/core';
import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TeammateCardComponent', () => {
  let component: TeammateCardComponent;
  let fixture: ComponentFixture<TeammateCardComponent>;
  let componentRef: ComponentRef<TeammateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeammateCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('name', 'role');
    componentRef.setInput('role', 'Middle');
    componentRef.setInput('description', 'text');
    componentRef.setInput('promoCode', '123456');
    componentRef.setInput('imgSrc', 'img');
    componentRef.setInput('linkHref', 'img');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
