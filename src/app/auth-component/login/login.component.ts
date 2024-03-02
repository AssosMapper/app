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

  onLogin() {
    this.store.dispatch(AuthActions.login({ credentials: { username: this.username, password: this.password } }));
  }
}
