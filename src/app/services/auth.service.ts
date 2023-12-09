import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/authRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private router:Router) { }
  logIN(auth:AuthRequest)  {
  return this.http.post('https://localhost:44382/api/OrderesHotels/login',auth,{responseType:"text"}).subscribe(res => {
    console.log(res);
    localStorage.setItem("token" ,res);

this.router.navigateByUrl("orderRoomService")
  })
  }
}
