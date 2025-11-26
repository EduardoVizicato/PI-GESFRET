import { TestBed } from '@angular/core/testing';

import { VerifyMailService } from './verify-mail.service';

describe('VerifyMailService', () => {
  let service: VerifyMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
