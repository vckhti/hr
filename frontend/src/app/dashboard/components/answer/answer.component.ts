import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {PersistanceService} from "../../services/persistance.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent {

  constructor(
    private persistanceService: PersistanceService
  ) {
  }
  @ViewChild('radioInput', {static: true}) radioInput: ElementRef;

  _model: any;
  get model(): any {return this._model;}
  @Input('model') set model(model: any){
    this._model = model;
  }

  _answer: string  = '';
  get answer(): string {return this._answer;}
  @Input('answer') set answer(answer: string){
    this._answer = answer;
  }
  @Input() num: number | undefined = undefined;

  _questionIndex: number ;
  get questionIndex(): number {return this._questionIndex;}
  @Input('questionIndex') set questionIndex(questionIndex: number) {
    this._questionIndex = questionIndex;
     if (questionIndex){
       this.radioInput.nativeElement.checked = false;
     }

    if (this.model) {
      const answersLength = (this.model.data[this.questionIndex]?.answers.length as number);
      if (this.model.data[questionIndex]?.answers[answersLength - 1]?.current_value === this.num
        && parseInt(this.persistanceService.get('id')) == this.model.data[questionIndex]?.answers[answersLength - 1]?.user_id) {
        this.radioInput.nativeElement.checked = true;
      } else {
        this.radioInput.nativeElement.checked = false;
      }
    }

  }

  @Output() itemClick = new EventEmitter<number>();

  onRowSelect(): void {
    this.itemClick.emit(this.num);
  }
}
