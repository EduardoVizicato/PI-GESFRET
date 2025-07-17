import { TestBed } from '@angular/core/testing';

import { NfStorageService } from './nf-storage.service';

describe('NfStorageService', () => {
  let service: NfStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
