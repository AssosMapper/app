import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Connexion réussie', response);
      },
      error => {
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}
