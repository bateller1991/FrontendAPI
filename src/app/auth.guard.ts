import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
