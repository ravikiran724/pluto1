import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ms-add-object-relationship',
  templateUrl: './add-object-relationship.component.html',
  styleUrls: ['./add-object-relationship.component.scss']
})
export class AddObjectRelationshipComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddObjectRelationshipComponent>,) { }

  ngOnInit(): void {
  }
  create(){
    this.dialogRef.close("form");
  }

  cancel(){
    this.dialogRef.close();
  }

}
