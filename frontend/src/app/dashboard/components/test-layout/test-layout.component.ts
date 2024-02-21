import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DashboardModel} from "../../models/dashboardModel";
import { Subscription} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";
import {IAnswerInterface} from "../../interfaces/answer.interface";

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.scss']
})
export class TestLayoutComponent implements OnInit, OnDestroy{

  @Input() model: DashboardModel;
  private _subscriptions: Subscription;
  selectedAnswer: number | undefined = undefined;

  constructor(
    private dashboardService: DashboardService,
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
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event).subscribe((res: any) => {
          this.model.getQuestion(this.model.selectedQuestionIndex).answers[answersLength - 1].current_value = event;
        })
      );
    }
    else if (this.model.getQuestion(this.model.selectedQuestionIndex) !== undefined && answersLength === 0) {
      const answer: IAnswerInterface = {
        question_id: this.model.selectedQuestionIndex,
        current_value: event
      }
      this._subscriptions.add(
        this.dashboardService.updateAnswer((this.model.getQuestion(this.model.selectedQuestionIndex) as IQuestionInterface).id, event).subscribe((res: any) => {
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
    this.model.stopTest();
  }

}
