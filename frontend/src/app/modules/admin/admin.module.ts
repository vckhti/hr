import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {NotFoundComponent} from "../../core/components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {PersistanceService} from "./services/persistance.service";
import {BooksComponent} from "./components/books/books.component";
import {AdminService} from "./services/admin.service";
import {TableModule} from "primeng/table";
import {DataTableComponent} from "./components/data-table/data-table.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {TabComponent} from "./components/tab/tab.component";
import {ContractSummaryComponent} from "./components/contract-summary/contract-summary.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [],
    children: [
      {
        path: 'tests',
        component: BooksComponent
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
    ContractSummaryComponent,
    BooksComponent,
    DataTableComponent,
    TabsComponent,
    TabComponent
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
