import { TestBed } from '@angular/core/testing';

import { ZipCodeService } from './zip-code.service';

describe('ZipCodeService', () => {
  let service: ZipCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
