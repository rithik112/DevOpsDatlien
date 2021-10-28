import { TestBed } from '@angular/core/testing';

import { ContactAuthorService } from './contact-author.service';

describe('ContactAuthorService', () => {
  let service: ContactAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAuthorService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
