import { TestBed } from '@angular/core/testing';

import { ActivadorService } from './activador.service';

describe('ActivadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivadorService = TestBed.get(ActivadorService);
    expect(service).toBeTruthy();
  });
});
