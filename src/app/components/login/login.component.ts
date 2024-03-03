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
  constructor(private http: HttpClient, private router: Router, private aute: AuthService) {

  }
  a = ""
  authRequest!: AuthRequest
  tzuser!: string
  roomNumber !: number
  wrngMesseg: string = ""
  succsesMesseg: string = "הנך מועבר לאתר"

  logIN() {
    this.authRequest = new AuthRequest();
    console.log(this.tzuser, this.roomNumber);
    this.authRequest.misparZehut = this.tzuser
    this.authRequest.roomNumber = this.roomNumber


    this.aute.logIN(this.authRequest).subscribe(
      data => {

        sessionStorage.setItem("token", data.token);
        this.wrngMesseg = ""
        console.log(data);
        // לשלוח כאן את כל האובייקט
        this.router.navigateByUrl("orderRoomServiceByCustumer")
      },
      err => {
        this.wrngMesseg = "לא הכנסת נתונים נכונים אנא נסה שוב"
      }
    )
  }


}

