import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from "../modules/auth/components/login/login.component";
import {NotFoundComponent} from "../core/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', component:
    DashboardComponent,
    canActivate: [
    ],
    children: [
      {
        path: '**',
        component: NotFoundComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
