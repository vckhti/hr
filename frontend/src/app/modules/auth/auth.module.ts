import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {AuthService} from "./services/auth.service";
import {LoginEffect} from "./store/effects/login.effect";
import {LoginComponent} from "./components/login/login.component";
import {GetCurrentUserEffect} from "./store/effects/getCurrentUser.effect";
import {PersistanceService} from "./services/persistance.service";
import {BackendErrorMessagesModule} from "./modules/backendErrorMessages/backendErrorMessages.module";
import {EffectsModule} from "@ngrx/effects";
import {Login2Component} from "./components/login2/login.component";

const routes = [
   {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login2',
    component: Login2Component
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [
    LoginComponent,
    Login2Component
  ],
  providers: [
    AuthService,
    PersistanceService,
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule {}
