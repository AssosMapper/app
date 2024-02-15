import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-component/auth-service';

@Component({
  selector: 'app-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log('Connexion réussie', response);
      },
      error => {
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}
