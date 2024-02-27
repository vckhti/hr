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
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, takeUntil } from 'rxjs/operators';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-contract-summary',
  templateUrl: './contract-summary.component.html',
  styleUrls: ['./contract-summary.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractSummaryComponent implements OnInit, OnChanges, OnDestroy {
	@Input() contract?: any;
	summary: any[] = [];
	loading = false;
	onDestroy$ = new Subject();
  keys: any[];

  constructor(
    private adminService: AdminService,
  private cdr: ChangeDetectorRef
              ) { }

	ngOnInit(): void {

	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.contract) {
			const contractId: number|undefined = changes.contract?.currentValue?.id ?? undefined;


			if (contractId !== undefined) {
				// Requiring contract summary

				this.loading = true;
        //this.initRequestContractSummaryObserver(contractId);
        this.keys = this.transformLeadObjectToArray(changes.contract.currentValue);
        console.log('ngOnChanges if',changes.contract.currentValue, this.keys);
        this.cdr.detectChanges();
			}
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next(true);
	}

  private initRequestContractSummaryObserver(contractId: number): void {
    const arg = {id: contractId}
    this.adminService.getTestById(arg)
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(response => {
        console.log('response if' );
        this.summary = response;
        this.loading = false;
      });
  }

  private transformLeadObjectToArray(value: any) : any[] {
    let keys = [];
    for (let key in value) {
      let newKey;
      switch (key) {
        case 'id': newKey = 'ID';
          break;
        case 'created_at': newKey = 'Дата и время создания';
          break;
        case 'updated_at': newKey = 'Дата и время обновления';
          break;
        case 'subject_metter_ids': newKey = 'Тематика';
          break;
        case 'user_id': newKey = 'Пользователь';
          break;
        case 'questions_count': newKey = 'Количество вопросов';
          break;
        case 'questions_ids': newKey = 'Вопросы на которых менялся ответ';
          break;
        case 'right_questions': newKey = 'Правильные ответы';
          break;
        case 'wrong_questions': newKey = 'Неправильные ответоы';
          break;
        case 'testing_times': newKey = 'Время тестирования';
          break;
        case 'testing_max_time': newKey = 'Время отведенное на тестирование';
          break;
        case 'comeback_ids': newKey = 'Возвращался к вопросам';
          break;
        case 'history_ids': newKey = 'История перемещения по вопросам';
          break;
        case 'answer_times_ids': newKey = 'Время ответов на вопросы по убывающей';
          break;
      }
      keys.push({key: newKey? newKey : key, value: value[key] != 0 ? value[key] : '-'});
    }
    return keys;
  }


}
