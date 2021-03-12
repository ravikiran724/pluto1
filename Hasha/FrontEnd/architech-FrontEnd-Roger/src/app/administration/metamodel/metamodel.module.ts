import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectTypeComponent } from './object-type/object-type.component';
import { RelationTypeComponent } from './relation-type/relation-type.component';
import { AttributesComponent } from './attributes/attributes.component';
import { RouterModule } from '@angular/router';
import { ModelRoutes } from './metamodel.routing';
import { MatTableModule } from '@angular/material/table';
import { EditAttributeComponent } from './attributes/edit-attribute/edit-attribute.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditObjectTypeComponent } from './object-type/edit-object-type/edit-object-type.component';
import { EditRelationTypeComponent } from './relation-type/edit-relation-type/edit-relation-type.component';
import { MatCardModule } from '@angular/material/card';
import { AddRelationTypeComponent } from './relation-type/add-relation-type/add-relation-type.component';
import { AddAttributesComponent } from './attributes/add-attributes/add-attributes.component';
import { AddObjectTypeComponent } from './object-type/add-object-type/add-object-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [ObjectTypeComponent, RelationTypeComponent, AttributesComponent, EditAttributeComponent, EditObjectTypeComponent, EditRelationTypeComponent, AddRelationTypeComponent, AddAttributesComponent, AddObjectTypeComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(ModelRoutes),
    MatTableModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,
    MatCardModule,MatSelectModule, MatChipsModule
  ]
})
export class MetamodelModule { }
