import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDefaultPage } from './car-default.page';

describe('CarDefaultPage', () => {
  let component: CarDefaultPage;
  let fixture: ComponentFixture<CarDefaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDefaultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDefaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
