import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezesComponent } from './bejelentkezes.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('BejelentkezesComponent', () => {
  let component: BejelentkezesComponent;
  let fixture: ComponentFixture<BejelentkezesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BejelentkezesComponent],
      imports:[NoopAnimationsModule],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BejelentkezesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
