import { Routes } from '@angular/router';
import { ObjectsComponent } from './objects/objects.component';
import { RelationshipsComponent } from './relationships/relationships/relationships.component';
export const ModelRoutes: Routes = [
  {
    path: '',
    redirectTo: 'objects',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'objects',
        component: ObjectsComponent,
      },
      {
        path: 'relationships',
        component: RelationshipsComponent
      }
    ],
  },
];
