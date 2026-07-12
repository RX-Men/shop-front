import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMMERCE_TOOLS_MOCK_PROVIDERS } from '@/app/core/services/commercetools/commercetools.service.mock';

import { CatalogGridComponent } from './catalog-grid.component';

describe('CatalogGridComponent', () => {
  let component: CatalogGridComponent;
  let componentRef: ComponentRef<CatalogGridComponent>;
  let fixture: ComponentFixture<CatalogGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogGridComponent],
      providers: [...COMMERCE_TOOLS_MOCK_PROVIDERS],
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
