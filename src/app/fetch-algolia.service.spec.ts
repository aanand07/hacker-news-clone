import { TestBed } from '@angular/core/testing';

import { FetchAlgoliaService } from './fetch-algolia.service';

describe('FetchAlgoliaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchAlgoliaService = TestBed.get(FetchAlgoliaService);
    expect(service).toBeTruthy();
  });
});
