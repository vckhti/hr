import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

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
  ) {
  }

  closeWindow(): void {
    this.ref.close();

  }

}
