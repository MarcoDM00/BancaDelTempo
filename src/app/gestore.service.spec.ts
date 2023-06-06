import { TestBed } from '@angular/core/testing';

import { GestoreService } from './gestore.service';

describe('GestoreService', () => {
  let service: GestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
