import {ResponseDataInterface} from "../interfaces/responseData.interface";
import {IQuestionInterface} from "../interfaces/IQuestionInterface";

export class RegionsModel {
  success: boolean
  errors: any;
  isLoading: boolean;
  selectedQuestionIndex: number;
  selectedQuestion: IQuestionInterface | undefined;
  public data: IQuestionInterface[] = [];

  constructor() {
    this.success = true;
    this.errors = null;
    this.isLoading = false;
    this.selectedQuestionIndex = 1;
    this.selectedQuestion = undefined;
  }

  public deleteFromDataArray(regionId: number): RegionsModel {
    for (let i = 0; i < this.data.length; i++) {
      if (regionId === this.data[i].id) {
        this.data.splice(i, 1);
      }
    }

    return this
  }

  public pushToDataArray(region: any): RegionsModel {

    this.data.push(region);
    return this
  }

  public findElementAndEdit(region: any): RegionsModel {
    for (let i = 0; i < this.data.length; i++) {
      if (region.id === this.data[i].id) {
        this.data[i] = region;
      }
    }

    return this
  }

  public saveToDataArray(array: IQuestionInterface[]): RegionsModel {
    this.data = [];
    this.data = array;

    return this;
  }

  public saveData(response: IQuestionInterface[]): RegionsModel {
    console.log('saveData', response);
    this.data = response;
    this.errors = null;
    this.success = true;

    return this;
  }

  public getDataArrayLength(): number{
    return this.data.length ?? 0;
  }

  public getSelectedAnswer(index: number): number {
    if (this.data && this.data.length > 0 && index) {
      return (this.data[index].history_id as number);
    } else {
      return 1;
    }
    //return 5;
  }

  public getQuestion(index: number): any {
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

  public cleanErrors(): RegionsModel {
    this.errors = null;

    return this;
  }


}
