import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TestLayoutComponent} from "./components/test-layout/test-layout.component";

const routes: Routes = [
  {
    path: '', component:
    DashboardComponent,
    canActivate: [
    ],
    children: [
      {path: '', redirectTo: '/test', pathMatch: 'full'},
      {path: 'test', component: TestLayoutComponent},
      //{path: 'books', component: BooksComponent},
      {path: '**', redirectTo: '/test', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
