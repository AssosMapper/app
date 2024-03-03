import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth-component/auth-service';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/reducers';
import { register } from '../auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm_password:'',
    phone: '',
  };


  selectedFile: File = null;

  constructor(private store: Store<AppState>) {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  // register() {
  //   const formData = new FormData();
  //   formData.append('user', JSON.stringify(this.user));
  //   if (this.selectedFile) {
  //     formData.append('avatar', this.selectedFile, this.selectedFile.name);
  //   }

  //   this.authService.register(this.user).subscribe(
  //     response => {
  //       // Gérez la réponse du serveur
  //     },
  //     error => {
  //       // Gérez les erreurs
  //     }
  //   );
  // };

  register() {
    const formData = new FormData();
    formData.append('user', JSON.stringify(this.user));
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    this.store.dispatch(register({ userData: this.user }));
  }
}
