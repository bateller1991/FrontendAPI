import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendAPI';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  signOut() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
