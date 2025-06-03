import { TestBed } from '@angular/core/testing';

import { UserpolicyService } from './userpolicy.service';

describe('UserpolicyService', () => {
  let service: UserpolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
