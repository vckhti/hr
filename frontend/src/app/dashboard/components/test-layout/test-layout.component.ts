import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegionsModel} from "../../models/regions.model";
import {BehaviorSubject, Subscription, switchMap} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.scss']
})
export class TestLayoutComponent implements OnInit, OnDestroy{

  public model: RegionsModel;
  private _listInitializer: BehaviorSubject<RegionsModel>;
  private _subscriptions: Subscription;
  selectedAnswer: number | undefined = undefined;

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

  public submit(event: number): void {
    console.log('event', event, this.model.getQuestion(this.model.selectedQuestionIndex));
    this.selectedAnswer = event;
    if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined) {
      console.log('event if', event);
      (this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).history_id = event;
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event).subscribe()
      );
    }


  }

  public nextQuestion(): void {
    console.log('nextQuestion', this.selectedAnswer);
    if (this.model.selectedQuestionIndex < this.model.getDataArrayLength()) {
      this.model.selectedQuestionIndex = this.model.selectedQuestionIndex + 1;

    }

  }

  public previousQuestion(): void {
    console.log('previousQuestion', this.selectedAnswer);
    if(this.model.selectedQuestionIndex > 1) {
      this.model.selectedQuestionIndex = this.model.selectedQuestionIndex - 1;
    }

  }

}
