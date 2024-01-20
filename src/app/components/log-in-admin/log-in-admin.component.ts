import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { authRequestAdmin } from 'src/app/models/authRequestAdmin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-admin',
  templateUrl: './log-in-admin.component.html',
  styleUrls: ['./log-in-admin.component.scss']
})
export class LogInAdminComponent {
  authRequestAdmin !: authRequestAdmin
  tzAdmin!: string
  passWord !: string
  wrngMesseg: string = ""
  succsesMesseg: string = "הנך מועבר לאתר"

  constructor(private http: HttpClient, private router: Router, private aute: AuthService) {

  }
  logINAdmin() {
    // צריך להכניס כאן גם טוקן
    this.wrngMesseg="";
    this.authRequestAdmin = new authRequestAdmin();
    this.authRequestAdmin.tzEmployee = this.tzAdmin;
    this.authRequestAdmin.passWord = this.passWord;
    console.log(this.authRequestAdmin.tzEmployee,this.authRequestAdmin.passWord);
    
    this.aute.logInAdmin(this.authRequestAdmin).subscribe(
      data => {

        sessionStorage.setItem("token", data);
        this.wrngMesseg = ""
        console.log(data);
        this.router.navigateByUrl("menuAdmin")
      },
      err => {
        this.wrngMesseg = "לא הכנסת נתונים נכונים אנא נסה שוב"
      }
    )



  }

}
