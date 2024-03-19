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
     // console.log('handleCurrentPage', event);
    if (this.dashboardService.getIsAnswered() && this.model.selectedQuestionIndex > -1) {
      let now = new Date().getTime();
      const ms = now - this.model.getQuestion(this.model.selectedQuestionIndex).execution_time_id;
      this.dashboardService.setIsAnswered(false);
      // const currentQuestion = this.model.getQuestion(event);
      // this.model.data[this.model.selectedQuestionIndex] = {...currentQuestion,history_id: null};
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, null, ms)
          .subscribe((res: any) => {
            this.model.selectedQuestionIndex = parseInt(event);
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

  markQuestion(index: number): void {
    if (!this.model.getQuestion(index).come_back_id) {
      this.model.getQuestion(index).come_back_id = 1;
    } else {
      this.model.getQuestion(index).come_back_id = null;

      let indexForDelete = this.model.marksQuestionsIndexes.indexOf((index));
      // // console.log('indexForDelete', index,indexForDelete,this.model.marksQuestionsIndexes);
      if (indexForDelete !== -1) {
        //indexForDelete = indexForDelete + 1;
        // // console.log('Delete', indexForDelete);
        this.model.marksQuestionsIndexes.splice(indexForDelete, 1);
      }
    }
    // // console.log('this.model.getQuestion(index)', this.model.getQuestion(index));
  }

}
