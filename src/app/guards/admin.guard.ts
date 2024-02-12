import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const isLoggedIn = this.authService.currentUserSubject.getValue() != null;
    const isAdmin = this.authService.isAdmin();

    if (!isLoggedIn) {
      this.router.navigate(['auth/login']);
      return false;
    }

    if (!isAdmin) {
      // Redirigez vers une autre page ou affichez un message d'erreur
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
