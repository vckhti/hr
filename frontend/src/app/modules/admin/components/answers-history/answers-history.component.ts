import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-answers-history',
  templateUrl: './answers-history.component.html',
  styleUrls: ['./answers-history.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AnswersHistoryComponent implements OnInit, OnDestroy {
  _contract: any;
  get contract(): any {
    return this._contract;
  }
  @Input('contract') set contract(contract: any) {
    // console.log('setter contract ');
    this._contract = contract;
    this.selectedNumber = 1;
    this.onQestionIdChanged('1');
  }
  selectedNumber: 1;
  loading = false;
  onDestroy$ = new Subject();
  data: any[];
  question: any;
  numbers:any[];
  variants: any[] = [];

  numbersArray: number[] = [];

  question_id: number;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    this.fillNubersArray();
  }

  ngOnInit(): void {


  }

  getQuestionVariantById(question: any): void {
    if (question) {
      let entries = Object.entries(question)
      entries.forEach( ([key, val]) => {
        if (key.substr(0,7) == 'variant') {
          this.variants.push(key.substr(7,8)+ ') ' + val);
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  private initGetQuestionByIdObserver(question_id: number): void {
    this.adminService.getQuestionById(question_id)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(response => {
        this.question = response;
        this.getQuestionVariantById(response);
      });
  }

  private initGetAnswersByQuestionIdObserver(question_id: number, user_id: number): void {
    const arg = {
      question_id: question_id,
      user_id: user_id
    }
    this.adminService.getAnswersByQuestionId(arg)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(response => {
        this.data = response;
        this.loading = false;
      });
  }


  fillNubersArray(): void {
    for (let i = 1; i < 21; i++) {
      this.numbersArray.push(i);
    }
  }

  onQestionIdChanged(value: string): void {
    this.variants = [];
    if (value.length > 0 && this.contract !== undefined && this.contract.user_id) {
      this.question_id = parseInt(value);
      this.loading = true;
      this.initGetQuestionByIdObserver(this.question_id);
      this.initGetAnswersByQuestionIdObserver(this.question_id, this.contract.user_id);
    }
  }



}
