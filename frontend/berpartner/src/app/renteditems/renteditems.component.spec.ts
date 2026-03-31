import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenteditemsComponent } from './renteditems.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('RenteditemsComponent', () => {
  let component: RenteditemsComponent;
  let fixture: ComponentFixture<RenteditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenteditemsComponent],
      imports:[NoopAnimationsModule],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenteditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
