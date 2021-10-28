import { TestBed } from '@angular/core/testing';

import { SpinnnerInterceptorService } from './spinnner-interceptor.service';

describe('SpinnnerInterceptorService', () => {
  let service: SpinnnerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnnerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
