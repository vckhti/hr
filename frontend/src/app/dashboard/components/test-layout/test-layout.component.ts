import {AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DashboardModel} from "../../models/dashboardModel";
import { Subscription} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";
import {IAnswerInterface} from "../../interfaces/answer.interface";
import {DialogService} from "primeng/dynamicdialog";
import {TestResultsComponent} from "../test-results/test-results.component";
import {AnswerComponent} from "../answer/answer.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.scss']
})
export class TestLayoutComponent implements OnInit, AfterViewInit, OnDestroy{
  //@ViewChildren(AnswerComponent) viewChildren!: QueryList<AnswerComponent>;

  @Input() model: DashboardModel;
  public selectedAnswer: number | undefined = undefined;
  public isLoading = false;
  testIsOver = false;
  isAnswered = false;

  private _subscriptions: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    this._subscriptions = new Subscription();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.viewChildren.forEach(item => {
    //   // console.log('item', item);
    // });
    // this.viewChildren.forEach(item => {
    //   // console.log('item', item);
    // });
  }

  checkAnswerValid(event: number): void {
    // console.log('checkAnswerValid',this.dashboardService.getIsAnswered());
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public submit(event: number): void {
    this.dashboardService.setIsAnswered(true);
    // console.log('submit', this.dashboardService.getIsAnswered());
    // this.model.stopTest();
    const answersLength = this.model.getQuestion(this.model.selectedQuestionIndex)?.answers.length as number;
    this.selectedAnswer = event;
    if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined && answersLength > 0) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // // // console.log('время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event, ms).subscribe((res: any) => {
          this.model.getQuestion(this.model.selectedQuestionIndex).answers[answersLength - 1].current_value = event;
        })
      );
    }
    else if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined && answersLength === 0) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // // // console.log('Время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
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
    // console.log('nextQuestion',this.dashboardService.getIsAnswered());
    if (this.dashboardService.getIsAnswered() && (this.model.selectedQuestionIndex < this.model.getDataArrayLength() -1)) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // // // console.log('время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            // console.log('nextQ res', res);
            const currentQuestion = this.model.getQuestion(this.model.selectedQuestionIndex);
            this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: 1};
            this.model.selectedQuestionIndex = this.model.selectedQuestionIndex + 1;
            const nextQuestion = this.model.getQuestion(this.model.selectedQuestionIndex);
            if (nextQuestion.history_id === 1) {
              this.dashboardService.setIsAnswered(true);
            } else {
              this.dashboardService.setIsAnswered(false);
            }

        })
      );
    } else {
      // console.log('nextQuestion else',this.dashboardService.getIsAnswered());
      this.messageService.add({
        severity: 'success',
        summary: 'Ответ не выбран',
        detail: 'Выберите ответ!',
      });
    }
  }

  public previousQuestion(): void {
    // console.log('previousQuestion',this.dashboardService.getIsAnswered());
    if (this.dashboardService.getIsAnswered() && (this.model.selectedQuestionIndex > 0)) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      // // // console.log('время ответа вопроса №',this.model.selectedQuestionIndex,' составляет', ms);
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            const currentQuestion = this.model.getQuestion(this.model.selectedQuestionIndex);
            this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: 1};
            this.model.selectedQuestionIndex = this.model.selectedQuestionIndex - 1;
            const previousQuestion = this.model.getQuestion(this.model.selectedQuestionIndex);
            if (previousQuestion.history_id === 1) {
              this.dashboardService.setIsAnswered(true);
            } else {
              this.dashboardService.setIsAnswered(false);
            }
        })
      );
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Ответ не выбран',
        detail: 'Выберите ответ!',
      });
    }
  }

  public finishTest(): void {
   // // // console.log('finishTime', this.model.testTimeLeft - 1);
    this.isLoading = true;

    const args = {
      subject_metter_id: 0,
      questions_count: 20,
      testing_times: this.model.testTimeLeft - 1,
      comeback_ids: this.converArrayIndexesToQuestionsIdString(this.model.marksQuestionsIndexesClone),
    }

    this.model.stopTest();
    this._subscriptions.add(
      this.dashboardService.finishTest(args)
        .subscribe((res: any) => {
          this.isLoading = false;
          // // console.log('finish', res);
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
      str=str + item + ',';
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
    // // // console.log(`questionChanged ${this.model.selectedQuestionIndex}`);
    this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id = new Date().getTime();
 }

}
