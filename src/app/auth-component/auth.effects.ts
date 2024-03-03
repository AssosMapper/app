import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth-service';
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) =>
      this.authService.login(action.credentials).pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          return AuthActions.loginSuccess({ token: response.token, user: response.user });
        }),
        catchError((error) => of(AuthActions.loginFailure({ error })))
      )
    )
  )
);

register$ = createEffect(() =>
this.actions$.pipe(
  ofType(AuthActions.register),
  switchMap(({ userData }) =>
    this.authService.register(userData).pipe(
      map(() => AuthActions.registerSuccess({ message: 'Registration successful' })),
      catchError(error => of(AuthActions.registerFailure({ error: error.message })))
    )
  )
)
);

constructor(
  private actions$: Actions,
  private authService: AuthService
) {}
}
