import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FetchAlgoliaService } from './fetch-algolia.service';

describe('FetchAlgoliaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FetchAlgoliaService = TestBed.get(FetchAlgoliaService);
    expect(service).toBeTruthy();
  });
});
