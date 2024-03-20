import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent {
  @ViewChild('radioInput', {static: true}) radioInput: ElementRef;
  @Input() answer: string  = '';
  @Input() num: number | undefined = undefined;

  _questionIndex: number ;
  get questionIndex(): number {return this._questionIndex;}
  @Input('questionIndex') set questionIndex(questionIndex: number){
    if (questionIndex){this.radioInput.nativeElement.checked = false;}
  }

  _selected:  number | undefined | null;
  get selected():  number | undefined | null {return this._selected;}
  @Input('selected') set selected(selected: number | undefined | null) {
    this._selected = selected;
    if (selected === this.num) {this.radioInput.nativeElement.checked = true;}
  }

  @Output() itemClick = new EventEmitter<number>();

  onRowSelect(): void {
    // //console.log('onRowSelect');
    this.itemClick.emit(this.num);
  }
}
