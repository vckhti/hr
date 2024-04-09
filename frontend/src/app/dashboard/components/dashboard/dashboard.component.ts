import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription, switchMap} from "rxjs";
import {DashboardModel} from "../../models/dashboardModel";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";
import {environment} from "../../../../environments/environment";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  public model: DashboardModel;
  private _listInitializer: BehaviorSubject<DashboardModel>;
  private _subscriptions: Subscription;
  public isProduction = environment.production;

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService
  ) {
    this.model = new DashboardModel();
    this._subscriptions = new Subscription();
    this._listInitializer = new BehaviorSubject(this.model);
  }

  ngOnInit(): void {
    this.dashboardService.setTestFinished(false);
    this.initRegionsDataArrayObserver();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initRegionsDataArrayObserver(): void {
    this._subscriptions.add(
      this._listInitializer.pipe(
        switchMap((model: DashboardModel) => this.dashboardService.fetchRegionsToModel(model)))
        .subscribe()
    );
  }

  public handleCurrentPage(event: any): void {
    if ( this.model.getQuestion().answer_id && (this.model.getQuestion().answer_id === 1) && this.model.selectedQuestionIndex > -1) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion().execution_time_id;
      const currentQuestion = this.model.getQuestion();
      this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: 1};
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion() as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            this.model.selectedQuestionIndex = parseInt(event);
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

  markQuestion(index: number): void {
    if (!this.model.getQuestion().come_back_id) {
      this.model.getQuestion().come_back_id = 1;
    } else {
      this.model.getQuestion().come_back_id = null;

      let indexForDelete = this.model.marksQuestionsIndexes.indexOf((index));
      if (indexForDelete !== -1) {
        this.model.marksQuestionsIndexes.splice(indexForDelete, 1);
      }
    }
  }

}
