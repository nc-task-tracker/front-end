import { TestBed, inject } from '@angular/core/testing';

import { GlobalUserStorageService } from './global-storage.service';

describe('GlobalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalUserStorageService]
    });
  });

  it('should be created', inject([GlobalUserStorageService], (service: GlobalUserStorageService) => {
    expect(service).toBeTruthy();
  }));
});
