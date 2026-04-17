import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequestComponent } from './reject-request.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RejectRequestComponent', () => {
  let component: RejectRequestComponent;
  let fixture: ComponentFixture<RejectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectRequestComponent],
      imports: [NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { }
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RejectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
