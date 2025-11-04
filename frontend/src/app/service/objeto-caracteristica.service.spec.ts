import { TestBed } from '@angular/core/testing';

import { ObjetoCaracteristicaService } from './objeto-caracteristica.service';

describe('ObjetoCaracteristicaService', () => {
  let service: ObjetoCaracteristicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetoCaracteristicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
