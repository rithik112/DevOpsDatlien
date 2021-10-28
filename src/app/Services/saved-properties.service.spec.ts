import { TestBed } from '@angular/core/testing';

import { SavedPropertiesService } from './saved-properties.service';

describe('SavedPropertiesService', () => {
  let service: SavedPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
