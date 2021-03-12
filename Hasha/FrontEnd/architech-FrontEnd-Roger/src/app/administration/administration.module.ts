import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministrationRoutes } from './administration.routing';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AdministrationRoutes),
    MatTableModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,
    MatCardModule,FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministrationModule { }
