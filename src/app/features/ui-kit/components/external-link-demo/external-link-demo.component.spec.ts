import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkDemoComponent } from './external-link-demo.component';

describe('ExternalLinkDemoComponent', () => {
  let component: ExternalLinkDemoComponent;
  let fixture: ComponentFixture<ExternalLinkDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLinkDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLinkDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
