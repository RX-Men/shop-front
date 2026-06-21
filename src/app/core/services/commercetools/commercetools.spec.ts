import { TestBed } from '@angular/core/testing';

import { COMMERCETOOLS_CONFIG } from './commercetools.config';
import { CommercetoolsService } from './commercetools.service';

const mockConfig = {
  projectKey: 'test-project',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  authUrl: 'https://auth.test.com',
  apiUrl: 'https://api.test.com',
  scopes: ['manage_project:test-project'],
};

describe('CommercetoolsService', () => {
  let service: CommercetoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: COMMERCETOOLS_CONFIG, useValue: mockConfig }],
    });
    service = TestBed.inject(CommercetoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
