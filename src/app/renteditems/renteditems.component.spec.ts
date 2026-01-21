import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenteditemsComponent } from './renteditems.component';

describe('RenteditemsComponent', () => {
  let component: RenteditemsComponent;
  let fixture: ComponentFixture<RenteditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenteditemsComponent]
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
