import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNavColComponent } from './footer-nav-col.component';

describe('FooterNavColComponent', () => {
  let component: FooterNavColComponent;
  let componentRef: ComponentRef<FooterNavColComponent>;
  let fixture: ComponentFixture<FooterNavColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNavColComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterNavColComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('title', 'Legal details');
    componentRef.setInput('links', [
      {
        variant: 'external-link',
        name: 'Privacy policy',
        href: '#',
      },
    ]);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
