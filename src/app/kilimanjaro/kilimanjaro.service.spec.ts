import { TestBed } from '@angular/core/testing';

import { KilimanjaroService } from './../../app/services/kilimanjaroservice';

describe('ShuttleDiscoveryService', () => {
  let service: KilimanjaroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KilimanjaroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
