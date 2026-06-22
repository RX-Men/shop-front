import { TestBed } from '@angular/core/testing';

import { COMMERCETOOLS_CONFIG } from './commercetools.config';
import { CommercetoolsService } from './commercetools.service';

describe('CommercetoolsService', () => {
  let service: CommercetoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COMMERCETOOLS_CONFIG,
          useValue: {
            projectKey: 'test-project',
            clientId: 'test-client-id',
            clientSecret: 'test-client-secret',
            authUrl: 'https://auth.example.com',
            apiUrl: 'https://api.example.com',
            scopes: ['manage_project:test-project'],
          },
        },
      ],
    });
    service = TestBed.inject(CommercetoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
