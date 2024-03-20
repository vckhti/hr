import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {MessageDialogComponent} from "./core/components/message-dialog/message-dialog.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./modules/auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AuthGuard} from "./modules/auth/services/auth.guard";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DashboardCanDeactivateService} from "./dashboard/services/dashboard-can-deactivate.service";
import {DashboardService} from "./dashboard/services/dashboard.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MessageDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    StoreModule.forRoot({}, {
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'hr-test',
      logOnly: true
    }),
    AuthModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [
    DashboardService,
    DashboardCanDeactivateService,
    MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
