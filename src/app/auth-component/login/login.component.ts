import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth.action';

@Component({
  selector: 'app-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private store: Store) {}

  // onLogin() {
  //   this.authService.login({ username: this.username, password: this.password }).subscribe(
  //     response => {
  //       console.log('Connexion réussie', response);
  //     },
  //     error => {
  //       console.error('Erreur lors de la connexion', error);
  //     }
  //   );
  // }

  onLogin() {
    this.store.dispatch(AuthActions.login({ credentials: { username: this.username, password: this.password } }));
  }
}
