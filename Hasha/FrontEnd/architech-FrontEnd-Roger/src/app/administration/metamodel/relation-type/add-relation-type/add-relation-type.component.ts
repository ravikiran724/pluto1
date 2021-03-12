import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from 'app/administration/users/users/edit-user/edit-user.component';
import { CoreService } from 'app/service/core/core.service';
import { ObjectTypeComponent } from '../../object-type/object-type.component';
import { ObjectTypeService } from 'app/service/my-service/object-type/object-type.service';
import { RelationshipTypeService } from 'app/service/my-service/relationship-type/relationship-type.service';
import { ToastrService } from 'ngx-toastr';
import { TileStyler } from '@angular/material/grid-list/tile-styler';

@Component({
  selector: 'ms-add-relation-type',
  templateUrl: './add-relation-type.component.html',
  styleUrls: ['./add-relation-type.component.scss']
})
export class AddRelationTypeComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditUserComponent>,
    private coreService: CoreService,
    private objTypeService: ObjectTypeService,
    private service: RelationshipTypeService,
    private toastr : ToastrService,
  ) { }

  typeObjectList;

  Name;
  ObjectTypeIdFrom;
  ObjectTypeIdTo;
  AToBDescription;
  BToADescription

  combinations = [
    {
      fromObjectTypeId: 0,
      toObjectTypeId: 0
    }
  ]

  ngOnInit(): void {
    this.objTypeService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.typeObjectList = result;
      }
    )
  }

  create(){

    let combinations = [];
    for (let i in this.combinations) {
      if (this.combinations[i].fromObjectTypeId != 0 && this.combinations[i].toObjectTypeId!=0) {
        combinations.push(this.combinations[i]);
      }
    }

    let data = {
      relationshipType: {
        name: this.Name,
        aToBDescription: this.AToBDescription,
        bToADescription: this.BToADescription
      },
      combinations: combinations,
    }

    console.log(data);
    if (this.Name&&this.AToBDescription&&this.BToADescription&&combinations.length> 0)  {
      this.service.createRelationshipType(data).subscribe(
        (result) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          if(error.status == 401) {
            this.toastr.error("Login error");
          }
          else
          this.toastr.error(error.error.message);
        }
      )
    }
    
  }

  removeElement(i){
    i-=1;
    console.log(i);
    this.combinations.splice(i, 1);

  }

  addElement(){
    let element = {
      fromObjectTypeId: 0,
      toObjectTypeId: 0,
    }
    this.combinations.push(element);

  }

  UpdateCombinations(index, value, type){
    console.log(index);
    if(type == 'from'){
      this.combinations[index].fromObjectTypeId = value;
    } 
    else if(type == 'to'){
      this.combinations[index].toObjectTypeId = value;
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}
