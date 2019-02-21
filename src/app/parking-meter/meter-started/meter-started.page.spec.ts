import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterStartedPage } from './meter-started.page';

describe('MeterStartedPage', () => {
  let component: MeterStartedPage;
  let fixture: ComponentFixture<MeterStartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterStartedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterStartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
