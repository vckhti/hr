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
  @Input('questionIndex') set questionIndex(questionIndex: number){
    if (questionIndex){
      this.radioInput.nativeElement.checked = false;
    }
  }
  _questionIndex: any;
  get questionIndex(): any {
    return this._questionIndex;
  }
  @Input() answer: string  = '';
  @Input() num: number | undefined = undefined;
  @Input('selected') set selected(selected: number | undefined | null) {
    this._selected = selected;
    if (selected === this.num) {
      this.radioInput.nativeElement.checked = true;
    }
  }
  _selected: any;
  get selected(): any {
    return this._selected;
  }

  @Output() itemClick = new EventEmitter<number>();

  onRowSelect(): void {
    this.itemClick.emit(this.num);
  }
}
