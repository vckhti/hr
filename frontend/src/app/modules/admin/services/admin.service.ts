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


  getTestResults(): Observable<any> {
    const url = environment.serverUrl + '/get_test_results';

    return this.http.get<any>(url).pipe(
      catchError((err: any) => {
        // console.log('err', err);
        return of(null);
      })
    )
  }

  getTestById(arg: any): Observable<any> {
    const url = environment.serverUrl + '/get_test_by_id';

    return this.http.post<any>(url,arg).pipe(
      catchError((err: any) => {
        // console.log('err', err);
        return of(null);
      })
    )
  }

}
