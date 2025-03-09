import { TestBed } from '@angular/core/testing';

import { SpeedCountService } from './speed-count.service';

describe('SpeedCountService', () => {
  let service: SpeedCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
