import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { PopinService } from 'src/app/services/pop-in.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private authService: AuthService,
              private popinService: PopinService
            ) {}

  onLogout() {

    this.authService.logout();
  }

}
