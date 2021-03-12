import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CoreService } from 'app/service/core/core.service';

@Component({
  selector: 'ms-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.scss']
})
export class EditObjectComponent implements OnInit {
  data;
  form: FormGroup;
  
  countAttribute: any[] = [false,false];
  
  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditObjectComponent>,
    private coreService: CoreService) { }

  ngOnInit(): void {
    
  }

  update(){
    this.dialogRef.close("form");
  }

  delete(){
    this.coreService.deleteObject("Are you sure you want to delete this Object").
    subscribe( res => { if(res == "yes"){ this.dialogRef.close(res) } })
  }

  addAttr(){
    this.countAttribute.push(1);
  }

}
