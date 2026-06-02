import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RouterLinkDemoComponent } from './router-link-demo.component';

describe('RouterLinkDemoComponent', () => {
  let component: RouterLinkDemoComponent;
  let fixture: ComponentFixture<RouterLinkDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLinkDemoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RouterLinkDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
