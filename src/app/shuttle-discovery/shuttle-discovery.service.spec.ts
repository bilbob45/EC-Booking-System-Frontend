import { TestBed } from '@angular/core/testing';

import { ShuttleDiscoveryService } from './shuttle-discovery.service';

describe('ShuttleDiscoveryService', () => {
  let service: ShuttleDiscoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuttleDiscoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
