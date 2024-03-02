import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AppState } from '../reducers';

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
