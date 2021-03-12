import { Routes } from "@angular/router";
import { SaasComponent } from "./saas/saas.component";
import { CrmComponent } from "./crm/crm.component";

export const DashboardRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "saas",
        component: SaasComponent,
      },
      {
        path: "langauge",
        component: CrmComponent,
      },
    ],
  },
];
