import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import {PersistanceService} from "./services/persistance.service";
import { TestLayoutComponent } from './components/test-layout/test-layout.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import {DashboardService} from "./services/dashboard.service";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AuthorsComponent,
    BooksComponent,
    TestLayoutComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PersistanceService,
    DashboardService
  ]
})
export class DashboardModule { }
