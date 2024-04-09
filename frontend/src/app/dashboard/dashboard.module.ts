import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TestLayoutComponent } from './components/test-layout/test-layout.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import {PaginationModule} from "./modules/pagination/pagination.module";
import { CountdownComponent } from './components/countdown/countdown.component';
import {DialogModule} from "primeng/dialog";
import { TestResultsComponent } from './components/test-results/test-results.component';
import {DialogService} from "primeng/dynamicdialog";
import {PersistanceService} from "./services/persistance.service";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    TestLayoutComponent,
    QuestionComponent,
    AnswerComponent,
    CountdownComponent,
    TestResultsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    DialogModule
  ],
  providers: [
    DialogService,
    PersistanceService
  ]
})
export class DashboardModule { }
