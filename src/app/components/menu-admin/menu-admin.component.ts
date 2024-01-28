import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  goToEmployee() {
    this.router.navigateByUrl('tableEmployees');
  }
  goToOreders() {
    this.router.navigateByUrl('tableCustumers')
  }
  goToProducts(){

  }
  

}
