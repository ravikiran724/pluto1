import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectRelationshipComponent } from './add-object-relationship.component';

describe('AddObjectRelationshipComponent', () => {
  let component: AddObjectRelationshipComponent;
  let fixture: ComponentFixture<AddObjectRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObjectRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObjectRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
