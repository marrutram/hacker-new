import { TestBed, inject } from '@angular/core/testing';

import { ApiarticlesService } from './apiarticles.service';

describe('ApiarticlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiarticlesService]
    });
  });

  it('should be created', inject([ApiarticlesService], (service: ApiarticlesService) => {
    expect(service).toBeTruthy();
  }));
});
