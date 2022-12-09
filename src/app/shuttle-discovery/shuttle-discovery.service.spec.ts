import { TestBed } from '@angular/core/testing';

import { BookingsService } from '../../app/services/bookingsservice';

describe('ShuttleDiscoveryService', () => {
  let service: BookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
