import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component:
    DashboardComponent,
    canActivate: [
     // DashboardGuard,
    ],
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      },

      // {
      //   path: 'account',
      //   loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
      // },
      //
      // {
      //   path: 'services',
      //   loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule),
      // },
      //
      // {
      //   path: 'payments',
      //   loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule),
      // },
      //
      // {
      //   path: 'statistics',
      //   loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule),
      // },
      //
      // //Applications
      // {
      //   path: 'applications',
      //   loadChildren: () => import('./modules/applications/applications.module').then(m => m.ApplicationsModule),
      // },
      // {
      //   path: 'change-password',
      //   loadChildren: () => import('./modules/change-password/change-password.module').then(m => m.ChangePasswordModule),
      // },
      //
      // {
      //   path: 'requests',
      //   loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
      // },
      //
      // {
      //   path: 'polls',
      //   loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
