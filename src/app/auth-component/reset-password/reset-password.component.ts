import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {

    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token');
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      this.authService.resetPassword(this.newPassword, this.token).subscribe(
        response => {
          console.log('Success to reset password', response);
        },
        error => {
          console.error('Failed to reset password', error);
        }
      );
    } else {
    }
  }

  validatePasswords(): boolean {
    if (this.newPassword === this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

}
