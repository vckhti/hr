import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store'
import {ReplaySubject} from "rxjs";
import {isLoggedInSelector} from "../store/selectors";
import {getCurrentUserAction} from "../store/actions/getCurrentUser.action";

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn$: ReplaySubject<boolean | null>
  isAnonymous$: Subscription
  isAnonymous: boolean;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.isLoggedIn$ = new ReplaySubject;
    this.isAnonymous$ = new Subscription;


    this.isAnonymous$ = this.store.pipe(select(isLoggedInSelector)).subscribe(
      (isLoggedIn: any)=>{
        if(isLoggedIn === true) {
          this.isAnonymous = false;
        } else {
          this.isAnonymous = true;
          this.store.dispatch(getCurrentUserAction());
        }
      }
    );

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAnonymous === false) {
      return true;
    }
    //this.router.navigate(['/login2']);
    return true;
  }
}
