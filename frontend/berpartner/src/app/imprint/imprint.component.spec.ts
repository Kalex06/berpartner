import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintComponent } from './imprint.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImprintComponent],
      imports:[NoopAnimationsModule],
            providers:[
              provideHttpClient(),
              provideHttpClientTesting()
            ],
      
            schemas: [NO_ERRORS_SCHEMA]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
