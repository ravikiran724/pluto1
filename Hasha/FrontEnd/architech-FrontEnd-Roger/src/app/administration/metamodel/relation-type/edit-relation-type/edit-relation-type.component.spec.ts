import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationTypeComponent } from './edit-relation-type.component';

describe('EditRelationTypeComponent', () => {
  let component: EditRelationTypeComponent;
  let fixture: ComponentFixture<EditRelationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
