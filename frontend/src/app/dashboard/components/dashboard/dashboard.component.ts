import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription, switchMap} from "rxjs";
import {DashboardModel} from "../../models/dashboardModel";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  public model: DashboardModel;
  private _listInitializer: BehaviorSubject<DashboardModel>;
  private _subscriptions: Subscription;

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.model = new DashboardModel();
    this._subscriptions = new Subscription();
    this._listInitializer = new BehaviorSubject(this.model);
  }

  ngOnInit(): void {
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
    console.log('handleCurrentPage', event);
    this.model.selectedQuestionIndex = parseInt(event);
  }

  markQuestion(index: number): void {
    if (!this.model.getQuestion(index).come_back_id) {
      this.model.getQuestion(index).come_back_id = 1;
    } else {
      this.model.getQuestion(index).come_back_id = null;

      let indexForDelete = this.model.marksQuestionsIndexes.indexOf((index));
      console.log('indexForDelete', index,indexForDelete,this.model.marksQuestionsIndexes);
      if (indexForDelete !== -1) {
        //indexForDelete = indexForDelete + 1;
        console.log('Delete', indexForDelete);
        this.model.marksQuestionsIndexes.splice(indexForDelete, 1);
      }
    }
    console.log('this.model.getQuestion(index)', this.model.getQuestion(index));
  }

}
