import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {CurrentUserInterface} from "../types/currentUser.interface";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(data: CurrentUserInterface): Observable<CurrentUserInterface> {
    const url = environment.serverUrl + '/login';
    return this.http.post<any>(url, data);
  }


  login2(data: CurrentUserInterface): Observable<CurrentUserInterface> {
    const url = environment.serverUrl + '/login2';
    return this.http.post<any>(url, data);
  }

}
