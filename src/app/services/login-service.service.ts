import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDetails } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signIn(userDetails: UserDetails) {
    return this.http.put('api/Login/' + userDetails, {}, {});
  }
}
