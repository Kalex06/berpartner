import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdvozloComponent } from './udvozlo.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('UdvozloComponent', () => {
  let component: UdvozloComponent;
  let fixture: ComponentFixture<UdvozloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UdvozloComponent],
      imports:[NoopAnimationsModule],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdvozloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
