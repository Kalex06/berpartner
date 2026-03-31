import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisztracioComponent } from './regisztracio.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisztracioComponent', () => {
  let component: RegisztracioComponent;
  let fixture: ComponentFixture<RegisztracioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisztracioComponent],
      imports:[NoopAnimationsModule],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisztracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
