import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyitemsComponent } from './myitems.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('MyitemsComponent', () => {
  let component: MyitemsComponent;
  let fixture: ComponentFixture<MyitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyitemsComponent],
      imports:[NoopAnimationsModule],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
