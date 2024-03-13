import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Custumer } from 'src/app/models/custumer';
import { orderRoomService } from 'src/app/models/orderRoomService';
import { OrdersForCustumer } from 'src/app/models/ordersForCustumer';
import { AuthService } from 'src/app/services/auth.service';
import { OrderRoomServiceService } from 'src/app/services/order-room-service.service';

@Component({
  selector: 'app-order-room-service-by-custumer',
  templateUrl: './order-room-service-by-custumer.component.html',
  styleUrls: ['./order-room-service-by-custumer.component.scss']
})
export class OrderRoomServiceByCustumerComponent implements OnInit {

  public custumer !: Custumer  


  public ordersForCustumer: OrdersForCustumer[] = []

  constructor(private http: HttpClient, private router: Router, private autoService: AuthService, private orderRoomService: OrderRoomServiceService) {
    // if (this.autoService.UserInside == false) {
    //   this.router.navigateByUrl('mainForAll')
    // }
  }
  ngOnInit(): void {
    this.orderRoomService.getOrderRoomServiceByCustumer().subscribe(res => {
      this.ordersForCustumer = res

    })


  }
  goToMarket() {
    this.router.navigateByUrl("market")
  }

  ishurKabala(order: OrdersForCustumer) {
    
    this.orderRoomService.ishurKabala(order.orderId).subscribe({
      next: res => {
        const Orderp = this.ordersForCustumer.find(o => o.orderId == order.orderId)
        if (Orderp === undefined) return
        Orderp.statusID = 3
      }, 
      error: err => console.log(err)      
    })
  } 
}
