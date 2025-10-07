import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/auth/services/auth.guard";
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {DashboardService} from "./dashboard/services/dashboard.service";
import {Login2Component} from "./modules/auth/components/login2/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'login2',
    component: Login2Component
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
