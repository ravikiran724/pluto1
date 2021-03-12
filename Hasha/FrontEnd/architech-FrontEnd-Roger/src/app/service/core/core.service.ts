import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EditObjectComponent } from 'app/model/objects/edit-object/edit-object.component';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { EditUserComponent } from 'app/administration/users/users/edit-user/edit-user.component';
import { EditAttributeComponent } from 'app/administration/metamodel/attributes/edit-attribute/edit-attribute.component';
import { ObjectTypeComponent } from 'app/administration/metamodel/object-type/object-type.component';
import { EditObjectTypeComponent } from 'app/administration/metamodel/object-type/edit-object-type/edit-object-type.component';
import { EditRelationTypeComponent } from 'app/administration/metamodel/relation-type/edit-relation-type/edit-relation-type.component';
import { AddObjectComponent } from 'app/model/objects/add-object/add-object.component';
import { AddUserComponent } from 'app/administration/users/users/add-user/add-user.component';
import { AddRelationTypeComponent } from 'app/administration/metamodel/relation-type/add-relation-type/add-relation-type.component';
import { AddAttributesComponent } from 'app/administration/metamodel/attributes/add-attributes/add-attributes.component';
import { AddObjectTypeComponent } from 'app/administration/metamodel/object-type/add-object-type/add-object-type.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AddRelationshipComponent } from 'app/model/relationships/add-relationship/add-relationship.component';
import { EditRelationshipComponent } from 'app/model/relationships/edit-relationship/edit-relationship.component';

@Injectable({
	providedIn: 'root'
})

export class CoreService {
	
	collapseSidebar 		 : boolean = false;
	collapseSidebarStatus : boolean;
	sidenavMode				 : string  = "side";
	sidenavOpen 			 : boolean = true;
	horizontalSideNavMode : string  = "over";
	horizontalSideNavOpen : boolean = false;
	projectDetailsContent : any;
	editProductData 		 : any;

	private keySearch = new BehaviorSubject('');
	shareKeySearch = this.keySearch.asObservable();

	constructor(private matDialog : MatDialog, private http : HttpClient, private router: Router){
	}

	editObject(id){
		let dialogRef : MatDialogRef<EditObjectComponent>;
		dialogRef = this.matDialog.open(EditObjectComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.data = id;
		return dialogRef.afterClosed();
	}
	editUser(id){
		let dialogRef : MatDialogRef<EditUserComponent>;
		dialogRef = this.matDialog.open(EditUserComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.id = id;
		return dialogRef.afterClosed();
	}
	editAttribute(id){
		let dialogRef : MatDialogRef<EditAttributeComponent>;
		dialogRef = this.matDialog.open(EditAttributeComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.id = id;
		return dialogRef.afterClosed();
	}
	editObjectType(id){
		let dialogRef : MatDialogRef<EditObjectTypeComponent>;
		dialogRef = this.matDialog.open(EditObjectTypeComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.id = id;
		return dialogRef.afterClosed();
	}
	editRelationType(id){
		let dialogRef : MatDialogRef<EditRelationTypeComponent>;
		dialogRef = this.matDialog.open(EditRelationTypeComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.id = id;
		return dialogRef.afterClosed();
	}
	editRelation(data){
		let dialogRef : MatDialogRef<EditRelationshipComponent>;
		dialogRef = this.matDialog.open(EditRelationshipComponent,{
			width: '600px',
		  });
		dialogRef.componentInstance.data = data;
		return dialogRef.afterClosed();
	}
	addObject(){
		let dialogRef : MatDialogRef<AddObjectComponent>;
		dialogRef = this.matDialog.open(AddObjectComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}
	addUser(){
		let dialogRef : MatDialogRef<AddUserComponent>;
		dialogRef = this.matDialog.open(AddUserComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}

	addRelationType(){
		let dialogRef : MatDialogRef<AddRelationTypeComponent>;
		dialogRef = this.matDialog.open(AddRelationTypeComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}

	addAttribute(){
		let dialogRef : MatDialogRef<AddAttributesComponent>;
		dialogRef = this.matDialog.open(AddAttributesComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}

	addObjectType(){
		let dialogRef : MatDialogRef<AddObjectTypeComponent>;
		dialogRef = this.matDialog.open(AddObjectTypeComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}
	
	addRelationship(){
		let dialogRef : MatDialogRef<AddRelationshipComponent>;
		dialogRef = this.matDialog.open(AddRelationshipComponent,{
			width: '600px',
		  });
		return dialogRef.afterClosed();
	}

	deleteObject( data : string ) {
		let dialogRef : MatDialogRef<DeleteDialogComponent>;
		dialogRef = this.matDialog.open(DeleteDialogComponent);
		dialogRef.componentInstance.data = data;

		return dialogRef.afterClosed();
	}

	changeKeySearch(key){
		this.keySearch.next(key);
		this.router.navigate(['/model/objects']);
	}
	
}