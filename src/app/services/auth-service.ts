import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { PopinService } from './pop-in.service';
import { MailService } from './mail.service';
import { ForgotPasswordResponse } from '../models/forgotPasswordResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  public currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private popinService: PopinService,
              private mailService: MailService
              ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  private setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  register(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/api/register`;
    return this.http.post<any>(url, formData).pipe(
      tap(
        response => {
          console.log('Résultat de l\'inscription:', response);
          this.popinService.showPopin('Enregistrement réussi');
          this.router.navigate(['/']);

          formData.forEach((value, key) => {
            if (key === 'user') {
              const user = JSON.parse(value as string);
              const emailData = {
                toEmail: user.email,
                subject: 'Bienvenue chez Nous',
                message: 'Votre inscription a été réussie.'
              };
              this.mailService.sendEmail(emailData).subscribe(
                emailResponse => console.log('Email de bienvenue envoyé', emailResponse),
                emailError => console.error('Erreur lors de l\'envoi de l\'email', emailError)
              );
            }
          });

          this.router.navigate(['/']).then(() => {
            this.popinService.showPopin('Enregistrement réussi');
          });
        },
        error => console.error('Erreur lors de l\'inscription:', error)
      )
    );
  }

  checkUserExists(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/check-user`;
    return this.http.post<any>(url, { email }).pipe(
        map(response => response.exists),
        catchError(error => {
            console.error('Erreur lors de la vérification de l\'utilisateur:', error);
            return of(false);
        })
    );
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/api/login`;
    return this.http.post<any>(url, credentials).pipe(
      tap(
        response => {
          this.setCurrentUser(response.user);
          localStorage.setItem('userLoginToken', response.token);
          this.router.navigate(['/']).then(() => {
          this.popinService.showPopin('Connexion réussie');
          });
        },
        error => {
          console.error('Erreur lors de la connexion', error);
          this.popinService.showPopin('Mauvais email ou mot de passe. Veillez réessayer.');
        }
      )
    );
  }

  logout(): void {
    this.popinService.showPopin('Déconnexion réussie');
    localStorage.removeItem('userLoginToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  modifyProfile(user: any, avatarFile?: File): Observable<any> {
    const url = `${this.baseUrl}/api/modify-profile`;
    const formData = new FormData();
    formData.append('user', JSON.stringify({ ...user, dateCreated: null }));
    if (avatarFile) {
        formData.append('avatar', avatarFile, avatarFile.name);
    }

    return this.http.put<any>(url, formData).pipe(
        tap(
            response => {

                this.setCurrentUser(response.updatedUser);
                this.popinService.showPopin('Profil modifié avec succès');
                this.router.navigate(['/']);
            },
            error => console.error('Erreur lors de la modification du profil:', error)
        )
    );
  }

  forgotPassword(email: string) {
    return this.http.post<ForgotPasswordResponse>(`${this.baseUrl}/api/forgot-password`, { email }).pipe(
      switchMap(response => {
        const resetLink = `http://localhost:4200/auth/reset-password?token=${response.token}`;
        const emailData = {
          toEmail: email,
          subject: 'Réinitialisation du mot de passe',
          message: `Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`
        };
        console.log("Données d'email:", emailData);
        return this.mailService.sendEmail(emailData);
      })
    );
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    const url = `${this.baseUrl}/api/reset-password`;
    return this.http.post<any>(url, { newPassword, token }).pipe(
      tap(
        response => {
          this.popinService.showPopin('Votre mot de passe a bien été modifier');
          this.router.navigate(['/']).then(() => {});
        },
        error => {
          this.popinService.showPopin('Erreur lors de la modification du mot de passe, veuillez réessayer.');

        }
      )
    );
  }

  deleteProfile(userId: string): Observable<any> {
    const url = `http://localhost:3000/api/delete-profile/${userId}`;
    return this.http.delete<any>(url).pipe(
      tap(
        response => {
          this.popinService.showPopin('Profil supprimé avec succès');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Erreur lors de la suppression du profil', error);
          this.popinService.showPopin('Erreur lors de la suppression du profil, veuillez réessayer.');
        }
      )
    );
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser && currentUser.roleId === 2;
  }
}
