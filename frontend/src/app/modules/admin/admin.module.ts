import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {NotFoundComponent} from "../../core/components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {PersistanceService} from "./services/persistance.service";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AdminService} from "./services/admin.service";
import {TableModule} from "primeng/table";
import {DataTableComponent} from "./components/data-table/data-table.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {TabComponent} from "./components/tab/tab.component";
import {ContractSummaryComponent} from "./components/contract-summary/contract-summary.component";
import {AnswersHistoryComponent} from "./components/answers-history/answers-history.component";
import {UsernamePipe} from "./pipes/username.pipe";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [],
    children: [
      {
        path: 'tests',
        component: AdminDashboardComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TableModule
  ],
  declarations: [
    AdminLayoutComponent,
    AnswersHistoryComponent,
    ContractSummaryComponent,
    AdminDashboardComponent,
    DataTableComponent,
    TabsComponent,
    TabComponent,
    UsernamePipe
  ],
  providers: [
    AuthService,
    PersistanceService,
    AdminService
  ],
  exports: []

})
export class AdminModule {
}
