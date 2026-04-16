import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeletionComponent } from './user-deletion.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('UserDeletionComponent', () => {
  let component: UserDeletionComponent;
  let fixture: ComponentFixture<UserDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDeletionComponent],
      imports:[NoopAnimationsModule],
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
        {
          provide: ToastrService,
          useValue: {
          success: () => {},
          error: () => {}
          }
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ],

      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
