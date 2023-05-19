import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedBodyStyle!: string;
  bodyStyles: any[] = [];
  filteredCars: any[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
    } else {
      this.loadBodyStyles();
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/sign-in']);
  }

  loadBodyStyles(): void {
    // Call your API or service to fetch the body styles
    this.carService.getBodyStyles().subscribe(
      (response: any) => {
        this.bodyStyles = response;
      },
      (error: any) => {
        console.error('Error fetching body styles:', error);
      }
    );
  }

  onBodyStyleChange(): void {
    if (this.selectedBodyStyle) {
      // Call your API or service to fetch the cars based on the selected body style
      this.carService.getCarsByBodyStyle(this.selectedBodyStyle).subscribe(
        (response: any) => {
          this.filteredCars = response;
        },
        (error: any) => {
          console.error('Error fetching cars by body style:', error);
        }
      );
    } else {
      this.filteredCars = [];
    }
  }

  getBodyStyleName(bodyStyleId: string): string {
    // Find and return the body style name based on the given ID
    const bodyStyle = this.bodyStyles.find(style => style.id === bodyStyleId);
    return bodyStyle ? bodyStyle.name : '';
  }
}
