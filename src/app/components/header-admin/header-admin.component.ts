import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent {
  constructor(private router : Router){}

  homeAdmin(){
    this.router.navigateByUrl('menuAdmin');
  }
  LogOutAdmin(){
    
    this.router.navigateByUrl('mainForAll')
  }
}
