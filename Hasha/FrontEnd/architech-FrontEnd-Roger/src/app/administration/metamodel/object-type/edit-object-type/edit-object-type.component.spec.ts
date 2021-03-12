import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjectTypeComponent } from './edit-object-type.component';

describe('EditObjectTypeComponent', () => {
  let component: EditObjectTypeComponent;
  let fixture: ComponentFixture<EditObjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
