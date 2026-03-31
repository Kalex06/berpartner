import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));


  let routerMock: any;

  beforeEach(() => {
    routerMock = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: Router,useValue: routerMock}
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('átirányítás a loginra ha nincs token',()=>{
    spyOn(localStorage,'getItem').and.returnValue(null);
    const result = executeGuard({} as any,{} as any);
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
