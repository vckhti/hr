import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {DashboardModel} from "../../models/dashboardModel";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AnswerComponent {

  constructor(private cdr: ChangeDetectorRef ) {
  }
  _model: any;
  get model(): any {return this._model;}
  @Input('model') set model(model: any){
    this._model = model;
      //// console.log('model getSelectedAnswer()', model);

  }

  @ViewChild('radioInput', {static: true}) radioInput: ElementRef;
  _answer: string  = '';
  get answer(): string {return this._answer;}
  @Input('answer') set answer(answer: string){
    //// console.log('answer', answer, this._selected, this.num);
    this._answer = answer;

  }
  @Input() num: number | undefined = undefined;

  _questionIndex: number ;
  get questionIndex(): number {return this._questionIndex;}
  @Input('questionIndex') set questionIndex(questionIndex: number){
    // console.log('questionIndex', questionIndex);
    this._questionIndex = questionIndex;
     if (questionIndex){
       this.radioInput.nativeElement.checked = false;
     }

    if (this.model) {
      // console.log('this.model if', this.model);
      const answersLength = (this.model.data[this.questionIndex]?.answers.length as number);
      if (this.model.data[questionIndex]?.answers[answersLength - 1]?.current_value === this.num) {
        // console.log('tthis.model.data[this.questionIndex]?.answers[answersLength - 1]?.current_value', this.model.data[this.questionIndex]?.answers[answersLength - 1]?.current_value);
        this.radioInput.nativeElement.checked = true;
      } else {
        // console.log('this.model else', this.model);
        this.radioInput.nativeElement.checked = false;
      }
    }

    //this.cdr.detectChanges();
  }

  _selected:  number | undefined | null;
  get selected():  number | undefined | null {return this._selected;}
  @Input('selected') set selected(selected: number | undefined | null) {
    // console.log('selected', selected);
    this._selected = selected;
    if (this._selected === this.num) {this.radioInput.nativeElement.checked = true;}
    //this.cdr.detectChanges();
  }

  @Output() itemClick = new EventEmitter<number>();

  onRowSelect(): void {
    // //// console.log('onRowSelect');
    this.itemClick.emit(this.num);
  }
}
