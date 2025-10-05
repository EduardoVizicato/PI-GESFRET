import { TestBed } from '@angular/core/testing';

import { UserVerifyService } from './user-verify.service';

describe('UserVerifyService', () => {
  let service: UserVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
