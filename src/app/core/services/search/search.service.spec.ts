import { TestBed } from '@angular/core/testing';

import { COMMERCE_TOOLS_MOCK_PROVIDERS } from '@/app/core/services/commercetools/commercetools.service.mock';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...COMMERCE_TOOLS_MOCK_PROVIDERS],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
