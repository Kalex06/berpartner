import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdvozloComponent } from './udvozlo.component';

describe('UdvozloComponent', () => {
  let component: UdvozloComponent;
  let fixture: ComponentFixture<UdvozloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UdvozloComponent]
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
