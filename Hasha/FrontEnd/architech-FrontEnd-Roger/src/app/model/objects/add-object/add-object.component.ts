import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CoreService } from 'app/service/core/core.service';
import { ObjectTypeService } from 'app/service/my-service/object-type/object-type.service';
import { ObjectService } from 'app/service/my-service/object/object.service';
import { ToastrService } from 'ngx-toastr';
import { throwIfEmpty } from 'rxjs/operators';
import { AuthService } from 'app/service/auth-service/auth.service';
import { CommonModule,CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ms-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss'],
  providers: [CurrencyPipe]
})
export class AddObjectComponent implements OnInit {
  hasAttribute = false;
  Name;
  ObjectTypeId ;
  CreateByUserId = 0;

  check = false;
  attributeValue= [];

  typeObjectList;

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<AddObjectComponent>,
    private coreService: CoreService,
    private objectTypeService : ObjectTypeService,
    private service: ObjectService,
    private toastr : ToastrService,
    public authService: AuthService,
    private currencyPipe : CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.CreateByUserId = Number(localStorage.getItem("userId"));
    this.objectTypeService.getAll().subscribe(
      (result) => {
        this.typeObjectList = result;
      }
    )
  }
  changeObjectType(id){
    this.objectTypeService.getAttribute(id).subscribe(
      (result) =>{
        this.attributeValue = [];
        if (result) {
          let attributeTypes = result.attributeTypes;
          attributeTypes.forEach(element => {
            let attributevalueItem = {
              "id": 0,
              "name": "",
              "format":"",
              "value": "",
              "option": []
            }
            attributevalueItem.id = element.id;
            attributevalueItem.format = element.format;
            attributevalueItem.name = element.name;
            if(element.format === "Dropdown"){
              let arr = element.valueOption.split(',');
              let objArr = [];
              for (let j in arr) {
                objArr.push({key: j, value : arr[j]});
              }
              attributevalueItem.option = objArr
            }
            console.log(attributevalueItem.option);
            this.attributeValue.push(attributevalueItem);
          });
          this.hasAttribute = this.attributeValue.length>0 ? true : false;
          console.log(this.attributeValue);
        }
        
      }
    )
  }
  changeValue(i, value){
    this.attributeValue[i].value = value;
  }
  create(){
    let attributes = [];
    for (let i in this.attributeValue) {
      if (this.attributeValue[i].value) {
        attributes.push({
          attributeTypeId: this.attributeValue[i].id,
          value: this.attributeValue[i].value
        })
      }
    }

    let data = { 
      object: {
        objectTypeId : this.ObjectTypeId,
        name: this.Name,
      }, 
      attributes: attributes,
    }
    console.log(data);
    this.service.createObject(data).subscribe(
      (result) => {
        this.dialogRef.close(true);
      },
      (error) => {
        
        if(error.status == 401) {
          this.dialogRef.close();
          this.toastr.error("Login error");
        }
        else
        this.toastr.error(error.error.message);
      }
    )
  }

  transformAmount(i, element){
    this.attributeValue[i].Value  = this.currencyPipe.transform(this.attributeValue[i].Value, '$');

    element.target.value = this.attributeValue[i].Value;
  }

  cancel(){
    this.dialogRef.close();
  }

}
