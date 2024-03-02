
# Documentation du Système d'Authentification

## Introduction

Cette documentation détaille le flux d'authentification dans l'application, en expliquant les interactions entre les sélecteurs, les actions, les effets et les reducers. Ce guide facilite la compréhension du cycle d'authentification pour les futurs développements ou maintenances.

##                                                      LOGIN 
###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ###### ######

Le processus d'authentification est déclenché par l'utilisateur lorsqu'il soumet ses informations de connexion. Voici le déroulement du cycle :

# Sélecteur `selectAuthState`

Le sélecteur `selectAuthState` est utilisé pour accéder directement à l'état global de l'authentification dans le store NgRx de l'application. Il constitue le point de départ pour créer des sélecteurs plus spécifiques qui extraient des informations précises de l'état d'authentification, telles que les messages d'erreur, les données de l'utilisateur, ou le statut d'authentification.

Le sélecteur est défini en accédant directement à la propriété `auth` de l'état global `AppState`, qui représente l'état d'authentification.

```typescript
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AppState } from '../reducers';

export const selectAuthState = (state: AppState) => state.auth;

### 2. Action de Login

Lorsque l'utilisateur tente de se connecter, l'action `login` est dispatchée avec les credentials de l'utilisateur.

```typescript
this.store.dispatch(login({ credentials: { username, password } }));
```

### 3. Effet de Login

L'effet `login$` intercepte l'action de login, appelle le service d'authentification et, en fonction de la réponse, dispatche soit `loginSuccess` avec le token et les données utilisateur, soit `loginFailure` avec un message d'erreur.

```typescript
login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) =>
      this.authService.login(action.credentials).pipe(
        map(data => AuthActions.loginSuccess({ token: data.token, user: data.user })),
        catchError(error => of(AuthActions.loginFailure({ error })))
      )
    )
  )
);
```

### 4. Reducer

Le reducer écoute les actions `loginSuccess` et `loginFailure` pour mettre à jour l'état de l'authentification dans le store, enregistrant le token et les données utilisateur ou un message d'erreur.

```typescript
const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    token: null,
    user: null
  }))
);
```
