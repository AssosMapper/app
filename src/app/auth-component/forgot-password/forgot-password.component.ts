import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-component/auth-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe(
        response => {
          // Afficher un message de succès ou rediriger l'utilisateur
        },
        error => {
          // Gérer les erreurs ici
        }
      );
    }
  }
}
