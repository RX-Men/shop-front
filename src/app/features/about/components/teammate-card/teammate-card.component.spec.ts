import { TeammateCardComponent } from '@/app/features/about/components/teammate-card/teammate-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TeammateCardComponent', () => {
  let component: TeammateCardComponent;
  let fixture: ComponentFixture<TeammateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeammateCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
