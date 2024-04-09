import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {IQuestionInterface} from "../../interfaces/IQuestionInterface";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  oldQuestionIndex: number | undefined;
  _question: IQuestionInterface;

  get question(): IQuestionInterface | null {
    return this._question ?? null;
  }

  @Input('question') set question(question: IQuestionInterface | null) {
    if (question) {
      if (!this.oldQuestionIndex) {
        this.oldQuestionIndex = question.id;
        this.questionIndexChanged.emit(true);
      } else if (this.oldQuestionIndex && this.oldQuestionIndex !== question.id) {
        this.questionIndexChanged.emit(true);
        this.oldQuestionIndex = question.id;
      }
      this._question = question;
      this.cdr.detectChanges();
    }
  }

  @Output() questionIndexChanged = new EventEmitter<boolean>();

}
