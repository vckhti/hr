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
  testTimeLeft: number = 0;

  constructor() {
    this.success = true;
    this.errors = null;
    this.isLoading = false;
    this.selectedQuestionIndex = 1;
    this.selectedQuestion = undefined;
    this.testStart = false;
  }

  startTest(): void {
    this.testStart = false;
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
    console.log('saveData', response);
    this.data = response;
    this.errors = null;
    this.success = true;

    return this;
  }

  public getDataArrayLength(): number{
    return this.data.length ?? 0;
  }

  public getSelectedAnswer(index: number): number | null {
    const answersLength = this.data[index]?.answers.length as number;
    if (this.data && this.data.length > 0 && index && this.data[index]?.answers[answersLength - 1]?.current_value) {
      return (this.data[index]?.answers[answersLength - 1]?.current_value as number);
    } else {
      return null;
    }
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

  public getQuestion(index: number): any {
    this.touchedIndexes.push(index-1);

    //console.log('getAnswer this.data[index]');
    if (this.data && this.data.length && index) {
      //console.log('getAnswer this.data[index]', this.data[index]);
      return this.data[index];
    } else {
      return null;
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
    return (this.selectedQuestionIndex === 1 );
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
