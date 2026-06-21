import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogGridComponent } from './catalog-grid.component';

describe('CatalogGridComponent', () => {
  let component: CatalogGridComponent;
  let componentRef: ComponentRef<CatalogGridComponent>;
  let fixture: ComponentFixture<CatalogGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogGridComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('products', []);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
