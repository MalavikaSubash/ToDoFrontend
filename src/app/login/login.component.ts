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
      console.log(this.userDetails);
      this.loginService.logIn(this.userDetails).subscribe(resultData => {
        sessionStorage.setItem('userData', JSON.stringify(resultData));
        console.log(resultData);
        this.router.navigate(['/Dashboard']);
      });
    });
  }

  /*
  public signInWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      this.userData = socialusers;
      console.log(this.userData);
      window.sessionStorage.setItem('userDetails', JSON.stringify(this.userData));
    });
  }

  public userLog() {
      this.storage = JSON.parse(sessionStorage.getItem('userDetails'));
      this.userDetails = {
         userName: this.storage.name,
         email: this.storage.email
       };
      console.log(this.userDetails);
      this.loginService.logIn(this.userDetails).subscribe(resultData => {
        console.log(resultData);
        this.router.navigate(['/Dashboard']);
      });
  }
  */
}
