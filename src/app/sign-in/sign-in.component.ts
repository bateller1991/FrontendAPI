import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  signIn(): void {
    this.authenticationService.login(this.email, this.password).subscribe(
      user => {
        this.router.navigate(['/home']);
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
