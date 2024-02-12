import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {
  userId: string;
  confirmationText: string = '';
  isConfirmationValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        console.log('Utilisateur connecté:', user);
        this.userId = user.id; // Récupérez l'ID de l'utilisateur
      } else {
        console.log('Aucun utilisateur connecté.');
      }
    });
  }

  confirmDelete(): void {
    if (this.confirmationText === 'DeleteMyProfil') {
      this.authService.deleteProfile(this.userId).subscribe(
        () => {
        },
        error => {
          console.error('Erreur lors de la suppression du profil', error);
        }
      );
    } else {
      console.error('La condition de confirmation n\'est pas remplie');
    }
  }
}
