import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Custumer } from 'src/app/models/custumer';

@Component({
  selector: 'app-order-room-service-by-custumer',
  templateUrl: './order-room-service-by-custumer.component.html',
  styleUrls: ['./order-room-service-by-custumer.component.scss']
})
export class OrderRoomServiceByCustumerComponent implements OnInit{
  custumer !:Custumer
  ngOnInit(): void {
    
  }
constructor(private http:HttpClient , private router: Router){}

goToMarket(){
  this.router.navigateByUrl("market")
}
}
