import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BannerDemoComponent } from './banner-demo.component';

describe('BannerDemoComponent', () => {
  let component: BannerDemoComponent;
  let fixture: ComponentFixture<BannerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerDemoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
