import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/authRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APILogin: string = "https://localhost:44382/api/OrderesHotels/login"

  constructor(private http: HttpClient, private router: Router) { }

  logIN(auth: AuthRequest) {

    return this.http.post(this.APILogin, auth, { responseType: "text" });
    //

    //
  }
}
