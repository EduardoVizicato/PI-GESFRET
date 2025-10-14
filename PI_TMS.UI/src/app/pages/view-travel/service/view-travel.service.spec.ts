import { TestBed } from '@angular/core/testing';

import { ViewTravelService } from './view-travel.service';

describe('ViewTravelService', () => {
  let service: ViewTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
