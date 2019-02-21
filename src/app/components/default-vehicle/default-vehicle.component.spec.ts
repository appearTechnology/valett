import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultVehicleComponent } from './default-vehicle.component';

describe('DefaultVehicleComponent', () => {
  let component: DefaultVehicleComponent;
  let fixture: ComponentFixture<DefaultVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
