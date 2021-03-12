import { Routes } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';
import { ObjectTypeComponent } from './object-type/object-type.component';
import { RelationTypeComponent } from './relation-type/relation-type.component';
import { Component } from '@angular/core';
import { UsersComponent } from '../users/users/users.component';
export const ModelRoutes: Routes = [
  {
    path: '',
    redirectTo: 'objecttype',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'attributes',
        component: AttributesComponent,
      },
      {
        path: 'objecttype',
        component: ObjectTypeComponent,
      },
      {
        path: 'relationtype',
        component: RelationTypeComponent,
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ],
  },
];
