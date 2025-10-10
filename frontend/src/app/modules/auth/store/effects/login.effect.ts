import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'
import {of} from 'rxjs'

import {PersistanceService} from 'src/app/modules/auth/services/persistance.service'
import {loginAction, loginFailureAction, loginSuccessAction, logOutAction} from "../actions/login.action";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../types/currentUser.interface";


@Injectable()
export class LoginEffect {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        if (request.name === 'marimonov') {
          return this.authService.login(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              const expDate = new Date().getTime() + 86400000;
              this.persistanceService.set('email', currentUser.email);
              this.persistanceService.set('token-exp', expDate);
              this.persistanceService.set('id', currentUser.id);

              if (currentUser.roles.length) {
                let str: string = '';
                for (let i = 0; i < currentUser.roles.length; i++) {
                  str += currentUser.roles[i] + ',';
                  this.persistanceService.set('roles', currentUser.roles[i]);
                }
                this.persistanceService.set('roles', str);
              }

              return loginSuccessAction({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(loginFailureAction({errors: errorResponse.error?.message ?? 'Сервеная ошибка'}));
            })
          )
        }
        else {
          return this.authService.login2(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              const expDate = new Date().getTime() + 86400000;
              this.persistanceService.set('email', currentUser.email);
              this.persistanceService.set('token-exp', expDate);
              this.persistanceService.set('id', currentUser.id);

              if (currentUser.roles.length) {
                let str: string = '';
                for (let i = 0; i < currentUser.roles.length; i++) {
                  str += currentUser.roles[i] + ',';
                  this.persistanceService.set('roles', currentUser.roles[i]);
                }
                this.persistanceService.set('roles', str);
              }

              return loginSuccessAction({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(loginFailureAction({errors: errorResponse.error?.message ?? 'Сервеная ошибка'}));
            })
          )
        }
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((action: any) => {
          if (action.currentUser.roles.includes('admin')) {
            this.router.navigateByUrl('/admin/tests');
          } else {
            this.router.navigateByUrl('/dashboard');
          }

        })
      ),
    {dispatch: false}
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOutAction),
        tap(() => {
          this.persistanceService.delete();
          this.router.navigate(['/login2']);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {
  }
}
