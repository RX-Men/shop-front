import { TestBed } from '@angular/core/testing';

import { CommercetoolsService } from '../commercetools';
import { COMMERCETOOLS_CONFIG, CommercetoolsConfig } from '../commercetools/commercetools.config';

import { ProductDetailService } from './product-detail.service';

const mockCommercetoolsService = { apiRoot: {} };

const mockConfig: CommercetoolsConfig = {
  projectKey: 'test-project',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  authUrl: 'https://auth.test.com',
  apiUrl: 'https://api.test.com',
  scopes: ['manage_project:test-project'],
};

describe('ProductDetailService', () => {
  let service: ProductDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CommercetoolsService, useValue: mockCommercetoolsService },
        { provide: COMMERCETOOLS_CONFIG, useValue: mockConfig },
      ],
    });
    service = TestBed.inject(ProductDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
