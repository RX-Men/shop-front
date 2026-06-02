import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRouterLinkDemoComponent } from './icon-router-link-demo.component';

describe('IconRouterLinkDemoComponent', () => {
  let component: IconRouterLinkDemoComponent;
  let fixture: ComponentFixture<IconRouterLinkDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconRouterLinkDemoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(IconRouterLinkDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
