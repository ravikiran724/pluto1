import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CoreService } from 'app/service/core/core.service';
import { AttributeTypeService } from 'app/service/my-service/attribute-type/attribute-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss']
})
export class EditAttributeComponent implements OnInit {
  @Input() id;

  name;
  format;
  option;

  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditAttributeComponent>,
    private coreService: CoreService,
    private service: AttributeTypeService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.service.getById(this.id).subscribe(
      (result) => {

        console.log(result)
        this.name = result.name;
        this.format = result.format;

        
        let objArr = [];
        if (result.valueOption) {
          let arr = result.valueOption.split(',');
          for (let j in arr) {
            objArr.push({key: j, value : arr[j]});
          }
        }
        
        this.option = objArr;
      }
    )
  }

  update(){
    let data = {
      id: this.id,
      name: this.name
    }
    this.service.updateAttributeType(data).subscribe( 
      (result) => {
        console.log(result);
        this.dialogRef.close("Updated");
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
    this.coreService.deleteObject("Are you sure you want to delete this Attribute").
    subscribe( res => { if(res == "yes"){ 
        this.service.deleteAttributeType(this.id).subscribe(
          (result)=>{
            this.dialogRef.close(result);
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
    })
  }
  cancel(){
    this.dialogRef.close();
  }
}
