import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingMeterSetPage } from './parking-meter-set.page';

describe('ParkingMeterSetPage', () => {
  let component: ParkingMeterSetPage;
  let fixture: ComponentFixture<ParkingMeterSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingMeterSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingMeterSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
