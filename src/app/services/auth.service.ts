import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, UserToknOrder } from '../models/authRequest';
import { Router } from '@angular/router';
import { authRequestAdmin } from '../models/authRequestAdmin';
import { Observable } from 'rxjs';
import { custumerIdForOrder } from '../models/CustumerIdForOrder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APILoginCustumer: string = "https://localhost:44382/api/OrderesHotels/loginCustumer";
  private APILoginAdmin: string = "https://localhost:44382/api/Employee/LogInAdmin"

  public userTokenOrder :UserToknOrder = new UserToknOrder();
  public UserInside : boolean = false;
  public custumerIdForGetOrder:custumerIdForOrder= new custumerIdForOrder();
  constructor(private http: HttpClient, private router: Router) { }

  // logIN(auth: AuthRequest)  {

  //   return this.http.post(this.APILoginCustumer, auth, { responseType: "text" });

  // }

  
  logIn(auth: AuthRequest) : Observable<UserToknOrder>  {

    return this.http.post<UserToknOrder>(this.APILoginCustumer, auth, );

  }
  logInAdmin(authRequestAdmin : authRequestAdmin){
    return this.http.post(this.APILoginAdmin,authRequestAdmin,{responseType: "text"});
  }
}
