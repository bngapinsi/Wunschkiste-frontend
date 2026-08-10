import { TestBed } from '@angular/core/testing';

import { Wunsch } from './wunsch';

describe('Wunsch', () => {
  let service: Wunsch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wunsch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
