import { TestBed } from '@angular/core/testing';

import { CommercetoolsService } from './commercetools.service';

describe('CommercetoolsService', () => {
  let service: CommercetoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercetoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
