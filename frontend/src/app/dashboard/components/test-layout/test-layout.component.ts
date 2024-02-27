import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DashboardModel} from "../../models/dashboardModel";
import { Subscription} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";
import {IAnswerInterface} from "../../interfaces/answer.interface";
import {DialogService} from "primeng/dynamicdialog";
import {TestResultsComponent} from "../test-results/test-results.component";

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.scss']
})
export class TestLayoutComponent implements OnInit, OnDestroy{
  @Input() model: DashboardModel;
  public selectedAnswer: number | undefined = undefined;
  public isLoading = false;
  testIsOver = false;

  private _subscriptions: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: DialogService,
  ) {
    this._subscriptions = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public submit(event: number): void {
    // this.model.stopTest();
    const answersLength = this.model.getQuestion(this.model.selectedQuestionIndex)?.answers.length as number;
    this.selectedAnswer = event;
    if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined && answersLength > 0) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // console.log('время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event, ms).subscribe((res: any) => {
          this.model.getQuestion(this.model.selectedQuestionIndex).answers[answersLength - 1].current_value = event;
        })
      );
    }
    else if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined && answersLength === 0) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // console.log('Время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
      const answer: IAnswerInterface = {
        question_id: this.model.selectedQuestionIndex,
        current_value: event
      }
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event, ms).subscribe((res: any) => {
          this.model.getQuestion(this.model.selectedQuestionIndex).answers.push(answer) ;
        })
      );
    }
  }

  public nextQuestion(): void {
    if (this.model.selectedQuestionIndex < this.model.getDataArrayLength() -1) {
      this.model.selectedQuestionIndex = this.model.selectedQuestionIndex + 1;
    }
  }

  public previousQuestion(): void {
    if (this.model.selectedQuestionIndex > 1) {
      this.model.selectedQuestionIndex = this.model.selectedQuestionIndex - 1;
    }
  }

  public finishTest(): void {
   // console.log('finishTime', this.model.testTimeLeft - 1);
    this.isLoading = true;

    const args = {
      subject_metter_id: 0,
      questions_count: 19,
      testing_times: this.model.testTimeLeft - 1,
    }

    this.model.stopTest();
    this._subscriptions.add(
      this.dashboardService.finishTest(args)
        .subscribe((res: any) => {
          this.isLoading = false;
          console.log('finish', res);
          this.testIsOver = true;
          this.showResultsDialog(res.questions_count,res.right_questions,res.wrong_questions,res.testing_times,);
        })
    )
  }

  private showResultsDialog(questions_count: number,right_questions: number, wrong_questions: number, testing_time: number): void {

    this.dialogService.open(TestResultsComponent, {
      header: 'Результаты тестирования',
      width: '600px',
      height: '600px',
      data: {
        questions_count: questions_count,
        right_questions: right_questions,
        wrong_questions: wrong_questions,
        testing_time: testing_time,
      }
    });

  }

 public questionChanged(): void {
    // console.log(`questionChanged ${this.model.selectedQuestionIndex}`);
    this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id = new Date().getTime();
 }

}
