import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAuthPage } from './check-auth.page';

describe('CheckAuthPage', () => {
  let component: CheckAuthPage;
  let fixture: ComponentFixture<CheckAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAuthPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
