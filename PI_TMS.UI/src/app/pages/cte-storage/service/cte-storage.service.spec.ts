import { TestBed } from '@angular/core/testing';

import { CteStorageService } from './cte-storage.service';

describe('CteStorageService', () => {
  let service: CteStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
