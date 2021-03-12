import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { ModelRoutes } from '../users/users.routing';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AddUserComponent } from './users/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsersComponent, EditUserComponent, AddUserComponent],
  imports: [
    RouterModule.forChild(ModelRoutes),
    CommonModule, FormsModule,
    ReactiveFormsModule,
    MatTableModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,
    MatCardModule
  ]
})
export class UsersModule { }
