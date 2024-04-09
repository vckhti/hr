import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {PersistanceService} from "./persistance.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService,
  ) { }


  public setToken (response: any) {
    if (response) {
      const expDate = new Date().getTime() + 86400000;
      this.persistanceService.set('token-exp', expDate.toString());
    }
    if (!response) {
      this.persistanceService.delete();
    }
  }

  get token () {
    const expDate = (this.persistanceService.get('token-exp'));
    if (expDate && (new Date().getTime()) > expDate ) {
      this.logout();
      return null;
    }
    return this.persistanceService.get('token-exp');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
