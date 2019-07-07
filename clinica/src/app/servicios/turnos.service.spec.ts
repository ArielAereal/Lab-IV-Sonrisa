import { TestBed } from '@angular/core/testing';

import { TurnosService } from './turnos.service';

describe('TurnosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurnosService = TestBed.get(TurnosService);
    expect(service).toBeTruthy();
  });
});
