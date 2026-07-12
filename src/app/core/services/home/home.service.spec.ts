import { TestBed } from '@angular/core/testing';

import { COMMERCE_TOOLS_MOCK_PROVIDERS } from '@/app/core/services/commercetools/commercetools.service.mock';

import { HomeService } from './home.service';

describe('Home', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...COMMERCE_TOOLS_MOCK_PROVIDERS],
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
