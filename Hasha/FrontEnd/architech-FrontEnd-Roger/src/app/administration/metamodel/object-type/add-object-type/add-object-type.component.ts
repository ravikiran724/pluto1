import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditObjectTypeComponent } from '../edit-object-type/edit-object-type.component';
import { CoreService } from 'app/service/core/core.service';
import { ObjectTypeService } from 'app/service/my-service/object-type/object-type.service';
import { ToastrService } from 'ngx-toastr';
import { AttributeTypeService } from 'app/service/my-service/attribute-type/attribute-type.service';


@Component({
  selector: 'ms-add-object-type',
  templateUrl: './add-object-type.component.html',
  styleUrls: ['./add-object-type.component.scss']
})
export class AddObjectTypeComponent implements OnInit {
  name;
  attributesList;
  attributesSelected = [];
  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditObjectTypeComponent>,
    private coreService: CoreService,
    private service: ObjectTypeService,
    private attTypeService: AttributeTypeService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.attTypeService.getAll().subscribe(
      (result) => {
        this.attributesList = result
      }
    )
  }

  create(){
    let data = {
      name : this.name,
      attributesSelected: this.attributesSelected
    }
    if (this.name&&this.attributesSelected&&this.attributesSelected.length>0) {
      this.service.createObjectType(data).subscribe(
        (result) => {
          this.dialogRef.close("Created");
          
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
    
  }

  cancel(){
    this.dialogRef.close();
  }

}
