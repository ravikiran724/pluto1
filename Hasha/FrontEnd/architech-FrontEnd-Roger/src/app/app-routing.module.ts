import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "model/objects",
    pathMatch: "full",
  },
  {
    path: "session",
    loadChildren: () =>
      import("./session/session.module").then((m) => m.SessionModule),
  },
  {
    path: "",
    component: MainComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: "always",
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "model",
        loadChildren: () =>
          import("./model/model.module").then((m) => m.ModelModule),
      },
      {
        path: "administration",
        loadChildren: () =>
          import("./administration/administration.module").then(
            (m) => m.AdministrationModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/loginV2",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class RoutingModule {}
