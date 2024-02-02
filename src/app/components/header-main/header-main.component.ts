import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent  {
 constructor(private router:Router){

 }
 logInCustumers(){
this.router.navigateByUrl('logInCustumers');
  }
  logInAdmin(){

    // this.router.navigateByUrl('logInAdmin')
     this.router.navigateByUrl('menuAdmin')

  }
}
