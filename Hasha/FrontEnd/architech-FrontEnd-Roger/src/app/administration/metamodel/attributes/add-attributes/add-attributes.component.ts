import { Component, OnInit } from '@angular/core';
import { EditAttributeComponent } from '../edit-attribute/edit-attribute.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/service/core/core.service';
import { AttributeTypeService } from 'app/service/my-service/attribute-type/attribute-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-add-attributes',
  templateUrl: './add-attributes.component.html',
  styleUrls: ['./add-attributes.component.scss']
})
export class AddAttributesComponent implements OnInit {
  
  name;
  format;
  valueCustom='0';
  customVar
  customArr = []

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditAttributeComponent>,
    private coreService: CoreService,
    private servive : AttributeTypeService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
  }

  create(){
    let data = {
      name: this.name,
      format: this.format,
      valueOption: this.format == 'Dropdown' ? this.customArr.toString() : null
    };

    console.log(data);  
    this.servive.createAttributeType(data).subscribe(
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

  cancel(){
    this.dialogRef.close();
  }

  setValueCustom(value){
    this.valueCustom = value;
  }

  addToCustom() {
    this.customArr.push(this.customVar);
    this.customVar = undefined;
    console.log(this.customArr);
  }
  remove(value: string): void {
    const index = this.customArr.indexOf(value);

    if (index >= 0) {
      this.customArr.splice(index, 1);
    }
  }

}
