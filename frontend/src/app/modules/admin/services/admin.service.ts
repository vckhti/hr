import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AdminService{

  constructor(
    private http: HttpClient,
  ) {
  }

  getNames(): Observable<any> {
    const url = environment.serverUrl + '/get_users_names';

    return this.http.get<any>(url).pipe(
      catchError((err: any) => {
        // // console.log('err', err);
        return of(null);
      })
    )
  }


  getTestResults(): Observable<any> {
    const url = environment.serverUrl + '/get_test_results';

    return this.http.get<any>(url).pipe(
      catchError((err: any) => {
        // // console.log('err', err);
        return of(null);
      })
    )
  }

  getQuestionById(question_id: number): Observable<any>{
    const url = environment.serverUrl + '/get_question_by_id';
    const args = {
      question_id: question_id
    }
    return this.http.post<any>(url,args).pipe(
      catchError((err: any) => {
        // // console.log('err', err);
        return of(null);
      })
    );
  }

  getAnswersByQuestionId(arg: any): Observable<any> {
    const url = environment.serverUrl + '/get_answers_by_question_id';

    return this.http.post<any>(url,arg).pipe(
      catchError((err: any) => {
        // // console.log('err', err);
        return of(null);
      })
    )
  }

}
