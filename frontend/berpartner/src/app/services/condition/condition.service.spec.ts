import { TestBed } from '@angular/core/testing';

import { ConditionService } from './condition.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConditionService', () => {
  let service: ConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
              provideHttpClient(),
              provideHttpClientTesting()
            ]
    });
    service = TestBed.inject(ConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
