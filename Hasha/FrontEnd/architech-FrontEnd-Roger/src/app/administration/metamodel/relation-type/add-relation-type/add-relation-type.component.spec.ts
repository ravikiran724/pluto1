import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationTypeComponent } from './add-relation-type.component';

describe('AddRelationTypeComponent', () => {
  let component: AddRelationTypeComponent;
  let fixture: ComponentFixture<AddRelationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
