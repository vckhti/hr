import {IQuestionInterface} from "../interfaces/IQuestionInterface";

export class DashboardModel {
  testStart: boolean | undefined;
  success: boolean
  errors: any;
  isLoading: boolean;
  selectedQuestionIndex: number;
  selectedQuestion: IQuestionInterface | undefined;

  public data: IQuestionInterface[] = [];
  public touchedIndexes: number[] = [];
  public marksQuestionsIndexes: number[] = [];
  public marksQuestionsIndexesClone: number[] = [];
  testTimeLeft: number = 0;

  constructor() {
    this.success = true;
    this.errors = null;
    this.isLoading = false;
    this.selectedQuestionIndex = 0;
    this.selectedQuestion = undefined;
    this.testStart = false;
  }

  startTest(): void {
    this.testStart = false;
  }

  canFinishTest(): boolean {
    let counter = 0;
    this.data.forEach((item: any) => {
      if (item.answer_id !== null) {
        counter = counter + 1;
      }
    });

    if (counter === 20) {
      return true;
    }
    return false;
  }

  resetAnswerIdFlags(): void {
    this.data.forEach((item: any) => {
      item.answer_id = null;
    });
  }

  stopTest(): void {
    this.testStart = true;
  }

  isTestActive(): boolean {
    return this.testStart === true;
  }

  public deleteFromDataArray(regionId: number): DashboardModel {
    for (let i = 0; i < this.data.length; i++) {
      if (regionId === this.data[i].id) {
        this.data.splice(i, 1);
      }
    }

    return this
  }

  public pushToDataArray(region: any): DashboardModel {

    this.data.push(region);
    return this
  }

  public findElementAndEdit(region: any): DashboardModel {
    for (let i = 0; i < this.data.length; i++) {
      if (region.id === this.data[i].id) {
        this.data[i] = region;
      }
    }

    return this
  }

  public saveToDataArray(array: IQuestionInterface[]): DashboardModel {
    this.data = [];
    this.data = array;

    return this;
  }

  public saveData(response: IQuestionInterface[]): DashboardModel {
    this.data = response;
    this.errors = null;
    this.success = true;

    return this;
  }

  public getDataArrayLength(): number{
    return this.data.length ?? 0;
  }

  public getSelectedAnswer(): number | null {
    const answersLength = this.data[this.selectedQuestionIndex]?.answers && this.data[this.selectedQuestionIndex]?.answers.length ? (this.data[this.selectedQuestionIndex]?.answers.length as number) : null;
    if (answersLength && this.data && this.data.length > 0  && this.data[this.selectedQuestionIndex]?.answers[answersLength - 1]?.current_value) {
      return (this.data[this.selectedQuestionIndex]?.answers[answersLength - 1]?.current_value as number);
    } else {
      return null;
    }
  }

  isMarkForComeBack(index: number): boolean {
    let uniqueArray = [...this.uniqueArray(this.marksQuestionsIndexes)];
    return uniqueArray.includes(index);
  }

  isQuestionAlreadyTouched(index: number): boolean {
    let uniqueArray = [...this.uniqueArray(this.touchedIndexes)];
    return uniqueArray.includes(index);
  }

  isAllQuestionsTouched(questionsLength: number):boolean {
    let uniqueArray = [...this.uniqueArray(this.touchedIndexes)];

    return questionsLength === uniqueArray.length;
  }

  private uniqueArray(arr: any): any[] {
    let a = [];
    for (let i = 0, l = arr.length; i < l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
        a.push(arr[i]);
    return a;
  }

  public getQuestion(): any {
    this.touchedIndexes.push(this.selectedQuestionIndex);
    this.touchedIndexes = this.uniqueArray(this.touchedIndexes);
    if (this.data && this.data.length && this.selectedQuestionIndex > -1) {
      if (this.data[this.selectedQuestionIndex].come_back_id === 1) {
        this.marksQuestionsIndexes.push(this.selectedQuestionIndex);
        this.marksQuestionsIndexesClone.push(this.selectedQuestionIndex);
      }
      this.marksQuestionsIndexes = this.uniqueArray(this.marksQuestionsIndexes);
      return this.data[this.selectedQuestionIndex];
    } else {
      return null;
    }
  }

  public setToSelectedQuestionAnswerIdFlag():void  {
    if (this.data[this.selectedQuestionIndex]) {
      this.data[this.selectedQuestionIndex].answer_id = 1;
    }

  }

  public getData(): IQuestionInterface[] {
    if (this.data && this.data.length > 0) {
      return this.data;
    } else {
      return [];
    }
  }

  public sortById(): void {

  }

  isLastQuestion(): boolean {
    return (this.selectedQuestionIndex === (this.data.length - 1) );
  }

  isFirstQuestion(): boolean {
    return (this.selectedQuestionIndex === 0 );
  }

  public cleanErrors(): DashboardModel {
    this.errors = null;

    return this;
  }

  public isNoAnswer(currentNumber: number): boolean {
    if(this.selectedQuestionIndex && (currentNumber > this.selectedQuestionIndex -1)) {
      return true;
    }
    return false;
  }


}
