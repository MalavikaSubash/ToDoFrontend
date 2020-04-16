import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  storage: any;
  FullName: string;
  imageUrl: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.storage = JSON.parse(sessionStorage.getItem('userDetails'));
    this.FullName = this.storage.firstName;
    this.imageUrl = this.storage.photoUrl;
  }

  signOut() {
    this.authService.signOut().then(data => {
      sessionStorage.removeItem('userDetails');
      this.router.navigate(['/Login']);
    });
  }

}
