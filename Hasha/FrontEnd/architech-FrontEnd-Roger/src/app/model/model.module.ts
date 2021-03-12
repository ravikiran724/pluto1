import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ObjectsComponent } from './objects/objects.component';
import { RouterModule } from '@angular/router';
import { ModelRoutes } from './model.routing';
import { MatTableModule } from '@angular/material/table';
import { EditObjectComponent } from './objects/edit-object/edit-object.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { AddObjectComponent } from './objects/add-object/add-object.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddObjectRelationshipComponent } from './objects/add-object-relationship/add-object-relationship.component';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RelationshipsComponent } from './relationships/relationships/relationships.component';
import { AddRelationshipComponent } from './relationships/add-relationship/add-relationship.component';
import { EditRelationshipComponent } from './relationships/edit-relationship/edit-relationship.component';

@NgModule({
  declarations: [ObjectsComponent, EditObjectComponent, AddObjectComponent, AddObjectRelationshipComponent, RelationshipsComponent, AddRelationshipComponent, EditRelationshipComponent],
  imports: [
    CommonModule, RouterModule.forChild(ModelRoutes), FormsModule, MatTreeModule,MatFormFieldModule,
    MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, 
    MatTableModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatIconModule,MatInputModule,MatButtonModule,
    MatSelectModule,MatChipsModule,MatCardModule,MatToolbarModule
  ],
  providers: [CurrencyPipe],
})
export class ModelModule {}
