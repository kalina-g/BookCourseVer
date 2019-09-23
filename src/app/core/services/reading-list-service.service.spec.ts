import { TestBed } from '@angular/core/testing';

import { ReadingListServiceService } from './reading-list-service.service';

describe('ReadingListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadingListServiceService = TestBed.get(ReadingListServiceService);
    expect(service).toBeTruthy();
  });
});
