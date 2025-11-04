import { TestBed } from '@angular/core/testing';

import { Objeto } from './objeto';

describe('Objeto', () => {
  let service: Objeto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Objeto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
