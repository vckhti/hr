import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/auth/services/auth.guard";
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {DashboardCanDeactivateService} from "./dashboard/services/dashboard-can-deactivate.service";
import {DashboardService} from "./dashboard/services/dashboard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [() => inject(DashboardService).getTestFinished()],
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
