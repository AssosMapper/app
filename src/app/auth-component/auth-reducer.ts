import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { initialAuthState, AuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AuthActions.logout, (state) => initialAuthState)
);
