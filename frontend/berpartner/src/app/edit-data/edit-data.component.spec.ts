import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataComponent } from './edit-data.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EditDataComponent', () => {
  let component: EditDataComponent;
  let fixture: ComponentFixture<EditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDataComponent],
      imports:[
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers:[
        {
          provide: MatDialogRef,
                useValue:{
                  close:()=>{}
                }
              },
              {
                provide: MAT_DIALOG_DATA,
                useValue:{}
              },
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
