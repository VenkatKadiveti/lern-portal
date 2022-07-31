import { TestBed } from '@angular/core/testing';

import { CsLibInitializerService } from './cs-lib-initializer.service';

describe('CsLibInitializerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsLibInitializerService = TestBed.get(CsLibInitializerService);
    expect(service).toBeTruthy();
  });
});
