import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails: UserDetails;

  constructor(public OAuth: AuthService,
              private router: Router,
              private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  public signInWithGoogle(socialProvider: string) {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.OAuth.signIn(socialPlatformProvider).then(result => {
      this.userDetails = {
        userName: result.name,
        email: result.email
      };
      sessionStorage.setItem('user', JSON.stringify(result));
      this.loginService.logIn(this.userDetails).subscribe(resultData => {
        sessionStorage.setItem('userData', JSON.stringify(resultData));
        this.router.navigate(['/Dashboard']);
      });
    });
  }
}
