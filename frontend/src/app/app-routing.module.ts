import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TestComponent} from "../components/test/test.component";

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: TestComponent },
];

// const appRoutes: Routes = [    // define this before @NgModule
//   { path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   },
//   { path: 'home', component: HomeComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
