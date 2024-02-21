import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription, switchMap} from "rxjs";
import {RegionsModel} from "../../models/regions.model";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  public model: RegionsModel;
  private _listInitializer: BehaviorSubject<RegionsModel>;
  private _subscriptions: Subscription;

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.model = new RegionsModel();
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
        switchMap((model: RegionsModel) => this.dashboardService.fetchRegionsToModel(model)))
        .subscribe()
    );
  }

  public handleCurrentPage(event: any): void {
    console.log('handleCurrentPage', event);
    this.model.selectedQuestionIndex = parseInt(event);
  }

}
