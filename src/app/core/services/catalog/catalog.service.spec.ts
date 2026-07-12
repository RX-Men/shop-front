import { TestBed } from '@angular/core/testing';

import { COMMERCE_TOOLS_MOCK_PROVIDERS } from '@/app/core/services/commercetools/commercetools.service.mock';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...COMMERCE_TOOLS_MOCK_PROVIDERS],
    });
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
