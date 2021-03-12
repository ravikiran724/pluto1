import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CoreService } from 'app/service/core/core.service';
import { ObjectTypeService } from 'app/service/my-service/object-type/object-type.service';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs/operators';
import { AttributeTypeService } from 'app/service/my-service/attribute-type/attribute-type.service';

@Component({
  selector: 'ms-edit-object-type',
  templateUrl: './edit-object-type.component.html',
  styleUrls: ['./edit-object-type.component.scss']
})
export class EditObjectTypeComponent implements OnInit {

  data;
  name;

  attributesSelected = [];
  attributesList;
  

  @Input() id;

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditObjectTypeComponent>,
    private coreService: CoreService,
    private service: ObjectTypeService,
    private attTypeService: AttributeTypeService,
    private matDialog: MatDialog ,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.service.getById(this.id).subscribe(
      (result) => {
        console.log(result)
        this.name = result.objectType.name;
        this.attributesSelected = result.attributesSelected;

        this.attTypeService.getAll().subscribe(
          (result) => {
            this.attributesList = result;
            console.log({2:result});
          }
        )
      }
    )
  }

  update(){
    let data = {
      id : this.id,
      name : this.name,
      attributesSelected: this.attributesSelected
    }
    console.log(data);
    this.service.updateObjectType(data).subscribe(
      (result) => {
        this.dialogRef.close("Updated");
      },
      (error) =>{
        if(error.status == 401) {
          this.toastr.error("Login error");
        }
        else
        this.toastr.error(error.error.message);
      }
    )
  }

  delete(){
    this.coreService.deleteObject("Are you sure you want to delete this Object type").
    subscribe( 
    (res) => { 
      if(res == "yes"){ 
        this.service.deleteObjectType(this.id).subscribe(
          (result)=>{
            this.dialogRef.close("Deleted");
          },
          (error) => {
            console.log(error);
            this.toastr.error(error.error.message);
          }
        ) 
      } 
    })
  }
  cancel(){
    this.dialogRef.close();
  }
}
