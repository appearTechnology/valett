import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderFlowComponent } from './loader-flow.component';


describe('LoaderFlowComponent', () => {
  let component: LoaderFlowComponent;
  let fixture: ComponentFixture<LoaderFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
