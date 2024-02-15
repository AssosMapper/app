import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth-component/auth-service';
import { User } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent {

  user: User;

  selectedFile: File = null;

  constructor(private authService: AuthService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(userData => {
      if (userData) {
        this.user = userData;
        console.log('Utilisateur connecté:', this.user);
      } else {
        console.log('Aucun utilisateur connecté.');
      }
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile() {
    this.authService.modifyProfile(this.user, this.selectedFile).subscribe(
      response => {
        console.log('Modification réussie', response);
      },
      error => {
        console.error('Erreur lors de la modification', error);
      }
    );
  }

  // onDateSelected() {
  //   const selectedDate = new Date(this.user.dateOfBirth);
  //   const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  //   this.user.dateOfBirth = new Date(formattedDate);

  //   console.log('Formatted Date:', formattedDate);
  // }



}
