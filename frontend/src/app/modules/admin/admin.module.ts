import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {NotFoundComponent} from "../../core/components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {PersistanceService} from "./services/persistance.service";
import {BooksComponent} from "./components/books/books.component";

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
  ],
  declarations: [
    AdminLayoutComponent,
    BooksComponent,
  ],
  providers: [
    AuthService,
    PersistanceService
  ],
  exports: []

})
export class AdminModule {
}
