import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { CarSelectionComponent } from './car-selection/car-selection.component';
import { AuthenticationService } from './authentication.service';
import { CarService } from './car.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'car-selection', component: CarSelectionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

const jwtOptions: JwtModuleOptions = {
  config: {
    tokenGetter: () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return currentUser.token;
    },
    allowedDomains: [''], // Replace with your actual domain
    disallowedRoutes: [''], // Replace with your actual login route
  },
};


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    CarSelectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot(jwtOptions),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    CarService,
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: jwtOptions },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
