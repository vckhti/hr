import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() answer: string  = '';
  @Input() num: number | undefined = undefined;
  @Input() selected: number | undefined = undefined;

  @Output() itemClick = new EventEmitter<number>();

  onRowSelect(): void {
    this.itemClick.emit(this.num);
  }
}
