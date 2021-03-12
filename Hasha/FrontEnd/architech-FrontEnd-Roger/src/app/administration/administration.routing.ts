import { Routes } from '@angular/router';
export const AdministrationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'metamodel',
        loadChildren: () =>
          import('./metamodel/metamodel.module').then((m) => m.MetamodelModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];
