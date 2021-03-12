import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CoreService } from 'app/service/core/core.service';
import { RelationshipTypeService } from 'app/service/my-service/relationship-type/relationship-type.service';
import { ToastrService } from 'ngx-toastr';
import { ObjectTypeService } from 'app/service/my-service/object-type/object-type.service';


@Component({
  selector: 'ms-edit-relation-type',
  templateUrl: './edit-relation-type.component.html',
  styleUrls: ['./edit-relation-type.component.scss']
})
export class EditRelationTypeComponent implements OnInit {

  id;
  form;
  data;

  typeObjectList;

  combinations = [
    {
      fromObjectTypeId: 0,
      toObjectTypeId: 0
    }
  ]


  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditRelationTypeComponent>,
    private coreService: CoreService,
    private service: RelationshipTypeService,
    private objTypeService: ObjectTypeService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.objTypeService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.typeObjectList = result;
      }
    )
    console.log(this.id);
    this.service.getById(this.id).subscribe(
      (result) => {
        this.data = result
        console.log(result);
      }
    )
  }

  update(){
    this.data.relationshipType.id= this.id;
    console.log(this.data);
    const combinations = []
    for (let i in this.data.combinations) {
      if (this.data.combinations[i].fromObjectTypeId>0&&this.data.combinations[i].toObjectTypeId>0) {
        combinations.push(this.data.combinations[i])
      }
    }
    let body = {
      relationshipType: this.data.relationshipType,
      combinations: combinations
    }
    this.service.updateRelationshipType(body).subscribe(
      (result) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    )
  }

  delete(){
    this.coreService.deleteObject("Are you sure you want to delete this Relationship type").
    subscribe( 
      res => { 
        if(res == "yes"){ 
          this.service.deleteRelationshipType(this.id).subscribe(
            (result) => {
              this.dialogRef.close(true);
            },
            (error) => {
              console.log(error);
              this.toastr.error(error.error.message);
            }
          )
        } 
      })
  }

  removeElement(i){
    i-=1;
    console.log(i);
    this.data.combinations.splice(i, 1);

  }

  addElement(){
    let element = {
      fromObjectTypeId: 0,
      toObjectTypeId: 0,
    }
    this.data.combinations.push(element);
  }

  UpdateCombinations(index, value, type){
    console.log(index);
    console.log(value);
    console.log(this.data);
    if(type == 'from'){
      this.data.combinations[index].from_object_type_id = value;
    } 
    else if(type == 'to'){
      this.data.combinations[index].to_object_type_id = value;
    }
  }
  cancel(){
    this.dialogRef.close();
  }

}
