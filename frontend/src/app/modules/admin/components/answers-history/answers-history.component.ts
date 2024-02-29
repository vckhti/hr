import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
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
export class AnswersHistoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() contract?: any;
  summary: any[] = [];
  loading = false;
  onDestroy$ = new Subject();
  data: any[];

  numbersArray: number[] = [];

  question_id: number;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('AnswersHistoryComponent');
    this.fillNubersArray();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contract) {
      const contractId: number|undefined = changes.contract?.currentValue?.id ?? undefined;

      if (contractId !== undefined) {
        // Requiring contract summary

        //this.loading = true;
        // this.keys = this.transformLeadObjectToArray(changes.contract.currentValue);
        // console.log('ngOnChanges if',changes.contract.currentValue, this.keys);
        //this.cdr.detectChanges();
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  private initHistoryOfSelectedQuestionObserver(question_id: number, user_id: number): void {
    const arg = {
      question_id: question_id,
      user_id: user_id
    }
    this.adminService.getQuestionById(arg)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(response => {
        this.summary = response;
        this.data = response;
        this.loading = false;
      });
  }


  fillNubersArray(): void {
    for (let i = 0; i < 21; i++) {
      this.numbersArray.push(i);
    }
  }

  onQestionIdChanged(value: string): void {
    if (value.length > 0 && this.contract !== undefined && this.contract.user_id) {
      this.question_id = parseInt(value);
      this.loading = true;
      this.initHistoryOfSelectedQuestionObserver(this.question_id, this.contract.user_id);
      this.cdr.detectChanges();
    }
  }

  private transformLeadObjectToArray(value: any): any[] {
    let keys = [];
    for (let key in value) {
      let newKey;
      switch (key) {
        case 'id':
          newKey = 'ID';
          break;
        case 'created_at':
          newKey = 'Дата и время создания';
          break;
        case 'updated_at':
          newKey = 'Дата и время обновления';
          break;
        case 'subject_metter_ids':
          newKey = 'Тематика';
          break;
        case 'user_id':
          newKey = 'Пользователь';
          break;
        case 'questions_count':
          newKey = 'Количество вопросов';
          break;
        case 'questions_ids':
          newKey = 'Вопросы на которых менялся ответ';
          break;
        case 'right_questions':
          newKey = 'Правильные ответы';
          break;
        case 'wrong_questions':
          newKey = 'Неправильные ответоы';
          break;
        case 'testing_times':
          newKey = 'Время тестирования';
          break;
        case 'testing_max_time':
          newKey = 'Время отведенное на тестирование';
          break;
        case 'comeback_ids':
          newKey = 'Возвращался к вопросам';
          break;
        case 'history_ids':
          newKey = 'История перемещения по вопросам';
          break;
        case 'answer_times_ids':
          newKey = 'Время ответов на вопросы по убывающей';
          break;
      }
      keys.push({key: newKey ? newKey : key, value: value[key] != 0 ? value[key] : '-'});
    }
    return keys;
  }


}
