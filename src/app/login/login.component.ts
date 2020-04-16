import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import { LoginServiceService } from '../services/login-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response;
  socialusers: any;
  userData: any;
  storage: any;
  userDetails: UserDetails;
  userLoggedIn: any;

  constructor(public OAuth: AuthService,
              private router: Router,
              private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  public signInWithGoogle(socialProvider: string) {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      this.userData = socialusers;
      console.log(this.userData);
      window.sessionStorage.setItem('userDetails', JSON.stringify(this.userData));

      this.storage = JSON.parse(sessionStorage.getItem('userDetails'));
      this.userDetails = {
         userName: this.storage.name,
         email: this.storage.email
       };
      console.log(this.userDetails);
      this.loginService.signIn(this.userDetails).subscribe(userLoggedIn => {
      this.userLoggedIn = userLoggedIn;
      console.log(this.userLoggedIn);
      this.router.navigate(['/Dashboard']);
    });
    });
  }
}
