import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/authRequest';
import { Router } from '@angular/router';
import { authRequestAdmin } from '../models/authRequestAdmin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APILoginCustumer: string = "https://localhost:44382/api/OrderesHotels/login";
  private APILoginAdmin: string = "https://localhost:44382/api/Employee/LogInAdmin"


  constructor(private http: HttpClient, private router: Router) { }

  logIN(auth: AuthRequest) {

    return this.http.post(this.APILoginCustumer, auth, { responseType: "text" });

  }
  logInAdmin(authRequestAdmin : authRequestAdmin){
    return this.http.post(this.APILoginAdmin,authRequestAdmin,{responseType: "text"});
  }
}
