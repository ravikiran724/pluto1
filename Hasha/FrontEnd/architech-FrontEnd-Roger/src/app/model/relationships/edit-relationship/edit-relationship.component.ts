import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/service/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { RelationshipService } from 'app/service/my-service/relationship/relationship.service';
import { ObjectService } from 'app/service/my-service/object/object.service';
import { RelationshipTypeService } from 'app/service/my-service/relationship-type/relationship-type.service';

@Component({
  selector: 'ms-edit-relationship',
  templateUrl: './edit-relationship.component.html',
  styleUrls: ['./edit-relationship.component.scss']
})
export class EditRelationshipComponent implements OnInit {

  @Input() data;

  id;
  
  Name:"";
  RelationshipType;
  FromObject;
  ToObject;

  fromTypeObjId;
  toTypeObjId;

  fromObjectList;
  toObjectList;
  realtionshipTypeList;

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditRelationshipComponent>,
    private coreService: CoreService,
    private service: RelationshipService,
    private toastr : ToastrService,
    public objService: ObjectService,
    public relaTypeService: RelationshipTypeService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.relaTypeService.getAll().subscribe(
      (result) => {
        this.realtionshipTypeList = result;
        console.log(this.realtionshipTypeList)
          if (this.data.relationshipType) {
            this.RelationshipType = this.data.relationshipType.id;
            this.objService.getByCombinationsFrom(this.RelationshipType).subscribe(
              (result) => {
                this.fromObjectList = result;
                let FromObjectType = this.fromObjectList.find(x => x.id === this.FromObject ).objectTypeId;
                this.objService.getByCombinationsTo(this.RelationshipType, FromObjectType).subscribe(
                  (result) => {
                    this.toObjectList = result;
                  }
                )
              }
            )
          }
            
            
          this.FromObject = this.data.fromObjectId,
          this.ToObject = this.data.toObjectId;
          
       
      }
    )
  }

  update(){
    let data = {
      id: this.data.id,
      relationshipTypeId: this.RelationshipType,
      fromObjectId: this.FromObject,
      toObjectId: this.ToObject,
    }
    this.service.updateRelationship(data).subscribe( 
      (result) => {
        console.log(result);
        this.dialogRef.close(true);
      },
      (error) => {
        if(error.status == 401) {
          this.toastr.error("Login error");
        }
        else
        this.toastr.error(error.error.message);
      }
    )
  }

  delete(){
    this.coreService.deleteObject("Are you sure you want to delete this Relationship").
    subscribe( res => { if(res == "yes"){ 
        this.service.deleteRelationship(this.id).subscribe(
          (result)=>{
            this.dialogRef.close(result);
          },
          (error) => {
            if(error.status == 401) {
              this.toastr.error("Login error");
            }
            console.log(error);
            this.toastr.error(error.error.message);
          }
        ) 
      } 
    })
  }

  changeRelaType(id){
    this.toObjectList = []
    
    this.objService.getByCombinationsFrom(id).subscribe(
      (result) => {
        this.fromObjectList = result;
        console.log(this.fromObjectList);        
      }
    )
    this.RelationshipType = id;
  }

  changeFromObj(id){
    this.FromObject = id;
    console.log(this.fromObjectList);
    
    let fromObjectTypeId = this.fromObjectList.find(x => x.Id === id).from_object_type_id;
    this.objService.getByCombinationsTo(this.RelationshipType, fromObjectTypeId).subscribe(
      (result) => {
        this.toObjectList = result;
      }
    )
  }

  cancel(){
    this.dialogRef.close();
  }
}
