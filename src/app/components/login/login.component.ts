import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthRequest } from 'src/app/models/authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http:HttpClient){

  }
authRequest!:AuthRequest 
tzuser!:string
roomNumber !: number
  logIN(){
console.log(this.tzuser,this.roomNumber);
this.authRequest.misparZehut = this.tzuser
this.authRequest.roomNumber = this.roomNumber
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  }
}
