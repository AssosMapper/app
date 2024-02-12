import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User = {
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: null,
    dateCreated: new Date(),
    phoneNumber: '',
    email: '',
    nationality: '',
    password: '',
    sexe: '',
  };

  selectedFile: File = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  checkAndRegister() {

    console.log('Données utilisateur soumises:', this.user);

    this.authService.checkUserExists(this.user.email).subscribe(exists => {
        if (exists) {
            console.log('Utilisateur existe déjà');
            // Gérer l'existence de l'utilisateur (afficher un message, etc.)
        } else {
            this.register();
        }
    });
}

  register() {
    const formData = new FormData();
    formData.append('user', JSON.stringify(this.user));
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    this.authService.register(formData).subscribe(
      response => {
        // Gérez la réponse du serveur
      },
      error => {
        // Gérez les erreurs
      }
    );
  };
}
