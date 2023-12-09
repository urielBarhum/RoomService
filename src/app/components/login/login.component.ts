import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/authRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http:HttpClient , private router:Router,private aute:AuthService){

  }
authRequest!:AuthRequest 
tzuser!:string
roomNumber !: number
  logIN(){
this.authRequest= new AuthRequest();
 console.log(this.tzuser,this.roomNumber);
this.authRequest.misparZehut = this.tzuser
this.authRequest.roomNumber = this.roomNumber


this.aute.logIN(this.authRequest)


  }
}
