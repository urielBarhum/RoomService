import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToknOrder } from 'src/app/models/authRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})

export class HeaderUserComponent implements OnInit {

  public userToknOrder: UserToknOrder = new UserToknOrder();

  constructor(private authService: AuthService , private router : Router) { }
  ngOnInit(): void {
    this.userToknOrder = this.authService.userTokenOrder
  }
homeUser(){
this.router.navigateByUrl('orderRoomServiceByCustumer')
}
LogOutUser(){
this.authService.UserInside = false;
this.authService.userTokenOrder = Object.create(null);


}

}
