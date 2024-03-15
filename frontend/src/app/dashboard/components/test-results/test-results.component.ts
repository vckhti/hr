import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {logOutAction} from "../../../modules/auth/store/actions/login.action";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {
  questions_count: number = this.config.data.questions_count;
  right_questions: number = this.config.data.right_questions;
  wrong_questions: number = this.config.data.wrong_questions;
  testing_time: number = this.config.data.testing_time;



  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private store: Store
  ) {
  }

  closeWindow(): void {
    this.store.dispatch(logOutAction());
    this.ref.close();

  }

}
