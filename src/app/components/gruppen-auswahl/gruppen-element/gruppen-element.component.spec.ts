/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { GruppenElementComponent } from './gruppen-element.component';

describe('GruppenElementComponent', () => {
  let component: GruppenElementComponent;
  let fixture: ComponentFixture<GruppenElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppenElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppenElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
