import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExternalLinkDemoComponent } from './icon-external-link-demo.component';

describe('IconExternalLinkDemoComponent', () => {
  let component: IconExternalLinkDemoComponent;
  let fixture: ComponentFixture<IconExternalLinkDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconExternalLinkDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconExternalLinkDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
