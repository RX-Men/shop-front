import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogToolbarComponent } from './catalog-toolbar.component';

describe('CatalogToolbarComponent', () => {
  let component: CatalogToolbarComponent;
  let componentRef: ComponentRef<CatalogToolbarComponent>;
  let fixture: ComponentFixture<CatalogToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogToolbarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('productsCount', 20);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
