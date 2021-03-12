import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { CoreService } from 'app/service/core/core.service';
import { RelationshipTypeService } from 'app/service/my-service/relationship-type/relationship-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RelationshipService } from 'app/service/my-service/relationship/relationship.service';
import { ObjectService } from 'app/service/my-service/object/object.service';

@Component({
  selector: 'ms-add-relationship',
  templateUrl: './add-relationship.component.html',
  styleUrls: ['./add-relationship.component.scss']
})
export class AddRelationshipComponent implements OnInit {

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
    private pageTitleService : PageTitleService, 
    private coreService: CoreService,
    private service: RelationshipService,
    private toastr : ToastrService,
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<AddRelationshipComponent>,
    public relaTypeService: RelationshipTypeService,
    public objService: ObjectService
  ) { }

  ngOnInit(): void {
    this.relaTypeService.getAll().subscribe(
      (result) => {
        this.realtionshipTypeList = result;
      }
    )
  }

  changeRelaType(id){
    this.RelationshipType = id;
    this.objService.getByCombinationsFrom(id).subscribe(
      (result) => {
        this.fromObjectList = result;
        console.log(result);
      }
    )
  }

  changeFromObj(id){
    this.FromObject = id;
    console.log(this.fromObjectList)
    let FromObjectType = this.fromObjectList.find(x => x.id === id ).objectTypeId;
    this.objService.getByCombinationsTo(this.RelationshipType, FromObjectType).subscribe(
      (result) => {
        this.toObjectList = result;
      }
    )
  }

  create(){
    let data = {
      name: this.Name === undefined ? "" : this.Name,
      fromObjectId: this.FromObject,
      toObjectId: this.ToObject,
      relationshipTypeId: this.RelationshipType,
    }

    this.service.createRelationship(data).subscribe(
      (result) => {
        this.dialogRef.close(true);
      },
      (error) => {
        if(error.status == 401) {
          this.toastr.error("Login error");
        }else
        this.toastr.error(error.error.message);
      }
    )
  }

  cancel(){
    this.dialogRef.close();
  }
}
