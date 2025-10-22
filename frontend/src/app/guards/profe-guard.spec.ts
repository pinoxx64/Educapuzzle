import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profeGuard } from './profe-guard';

describe('profeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
