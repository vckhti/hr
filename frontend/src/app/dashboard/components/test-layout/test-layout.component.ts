import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {DashboardModel} from "../../models/dashboardModel";
import { Subscription} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";
import {IAnswerInterface} from "../../interfaces/answer.interface";
import {DialogService} from "primeng/dynamicdialog";
import {TestResultsComponent} from "../test-results/test-results.component";
import {MessageService} from "primeng/api";
import {PersistanceService} from "../../services/persistance.service";

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TestLayoutComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() model: DashboardModel;
  public selectedAnswer: number | undefined = undefined;
  public isLoading = false;
  testIsOver = false;
  isAnswered = false;

  private _subscriptions: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: DialogService,
    private persistanceService: PersistanceService,
    private messageService: MessageService
  ) {
    this._subscriptions = new Subscription();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  checkAnswerValid(event: number): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public submit(event: number): void {
    this.dashboardService.setIsAnswered(true);
    const answersLength = (this.model.getQuestion()?.answers && this.model.getQuestion()?.answers.length)? (this.model.getQuestion()?.answers.length as number) : 0;
    this.selectedAnswer = event;
    if (this.model.getQuestion()) {
      this.model.setToSelectedQuestionAnswerIdFlag();
    }

    if (this.model.getQuestion() && answersLength > 0) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion().execution_time_id;
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion() as IQuestionInterface).id, event, ms).subscribe((res: any) => {
          this.model.getQuestion().answers[answersLength - 1].current_value = event;
          this.model.getQuestion().answers[answersLength - 1].user_id = parseInt(this.persistanceService.get('id'));
        })
      );
    }
    else {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion().execution_time_id;
      const answer: IAnswerInterface = {
        question_id: this.model.selectedQuestionIndex,
        current_value: event,
        user_id: parseInt(this.persistanceService.get('id')),
      }
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion() as IQuestionInterface).id, event, ms).subscribe((res: any) => {
          this.model.getQuestion().answers.push(answer);
        })
      );
    }
  }

  public nextQuestion(): void {
    if ( this.model.getQuestion().answer_id === 1 && this.model.getQuestion().answer_id === 1 && (this.model.selectedQuestionIndex < this.model.getDataArrayLength() -1)) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion().execution_time_id;
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion() as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            const currentQuestion = this.model.getQuestion();
            this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: 1};
            this.model.selectedQuestionIndex = this.model.selectedQuestionIndex + 1;
        })
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ответ не выбран',
        detail: 'Выберите ответ!',
      });
    }
  }

  public previousQuestion(): void {
    if ( this.model.getQuestion().answer_id === 1 && (this.model.selectedQuestionIndex > 0)) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion().execution_time_id;
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion() as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            const currentQuestion = this.model.getQuestion();
            this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: 1};
            this.model.selectedQuestionIndex = this.model.selectedQuestionIndex - 1;
        })
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ответ не выбран',
        detail: 'Выберите ответ!',
      });
    }
  }

  public finishTest(): void {
    if (!this.model.canFinishTest()) {
      return ;
    }

    this.isLoading = true;

    const args = {
      subject_metter_id: 0,
      questions_count: 20,
      testing_times: this.model.testTimeLeft - 1,
      comeback_ids: this.converArrayIndexesToQuestionsIdString(this.model.marksQuestionsIndexesClone),
    }

    this.model.stopTest();
    this.model.resetAnswerIdFlags();
    this._subscriptions.add(
      this.dashboardService.finishTest(args)
        .subscribe((res: any) => {
          this.isLoading = false;
          this.testIsOver = true;
          this.showResultsDialog(res.questions_count,res.right_questions,res.wrong_questions,res.testing_times,);
        })
    )
  }

  private uniqueArray(arr: any): any[] {
    let a = [];
    for (let i = 0, l = arr.length; i < l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
        a.push(arr[i]);
    return a;
  }

  converArrayIndexesToQuestionsIdString(array: number[]): string {
    let str='';
    this.uniqueArray(array).map(item => item +1).forEach(item => {
      str=str + item + ', ';
    });

    return str;
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
    this.model.getQuestion().execution_time_id = new Date().getTime();
 }

}
