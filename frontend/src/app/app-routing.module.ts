import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./core/components/not-found/not-found.component";

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule),
  // },
  { path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
