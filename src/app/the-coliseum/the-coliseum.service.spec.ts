import { TestBed } from '@angular/core/testing';

import { TheColiseumService } from './the-coliseum.service';

describe('TheColiseumService', () => {
  let service: TheColiseumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheColiseumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
