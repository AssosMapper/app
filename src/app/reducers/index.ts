import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthState } from '../auth-component/auth.state';
import { authReducer } from '../auth-component/auth-reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [
];
