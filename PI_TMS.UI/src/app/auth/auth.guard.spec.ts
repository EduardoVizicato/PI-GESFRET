import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  

  let executeGuard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const authGuard = TestBed.inject(AuthGuard);
    executeGuard = authGuard.canActivate.bind(authGuard);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
