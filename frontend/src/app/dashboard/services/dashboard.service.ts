import {Injectable} from "@angular/core";
import {DashboardModel} from "../models/dashboardModel";
import {map, Observable, of, take} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {IQuestionInterface} from "../interfaces/IQuestionInterface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient,
  ) {
  }

  updateAnswer(question_id: number, current_choiсe: number): any {
    const url = environment.serverUrl + '/updateAnswer';
    const args = {
      question_id: question_id,
      current_choiсe: current_choiсe
    }
    return this.http.post(url,args).pipe(
      take(1)
      // map(() => {
      //   return of(null)
      // })
    )
  }

  fetchRegionsToModel(model: DashboardModel): Observable<DashboardModel> {
    const url = environment.serverUrl + '/get_questions';

    return this.http.get<any>(url).pipe(
      map((response: IQuestionInterface[]) => {
        console.log('response', response);
        return model.saveData(response)
      }),
      catchError((err: any) => {
        console.log('err', err);
        return of(model);
      })
    )
  }

  // sortModelByID(model: RegionsModel): Observable<RegionsModel> {
  //   let asc: boolean = false;
  //   model.getData().sort((a: any, b: any) => {
  //     if (a.id < b.id) {
  //       return asc ? 1 : -1;
  //     } if (a.id > b.id) {
  //       return asc ? -1 : 1;
  //     }
  //     return 0;
  //   });
  //   return of(model);
  // }
}
