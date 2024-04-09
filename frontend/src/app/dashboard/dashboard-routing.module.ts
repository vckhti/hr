import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from "../core/components/not-found/not-found.component";
import {DashboardCanDeactivateService} from "./services/dashboard-can-deactivate.service";
import {DashboardService} from "./services/dashboard.service";

const routes: Routes = [
  {
    path: '', component:
    DashboardComponent,
    canDeactivate: [DashboardCanDeactivateService],
    children: [
      {
        path: '**',
        component: NotFoundComponent,
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
