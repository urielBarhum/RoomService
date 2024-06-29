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
  public priceForAll: number = 0;

  public ordersForCustumer: OrdersForCustumer[] = []

  constructor(private http: HttpClient, private router: Router, private autoService: AuthService, private orderRoomService: OrderRoomServiceService) {
    // if (this.autoService.UserInside == false) {
    //   this.router.navigateByUrl('mainForAll')
    // }
  }

  ngOnInit(): void {
    debugger;
    // בדוק אם יש טוקן בסשן סטורג'
    const token = sessionStorage.getItem('token');
    if (!token) {
      // אם אין טוקן, נווט חזרה לדף ההתחברות
      this.router.navigateByUrl('login');
      return;
    }

    this.orderRoomService.getOrderRoomServiceByCustumer().subscribe({
      next: (res) => {
        this.ordersForCustumer = res;
        this.priceForAll = this.ordersForCustumer.reduce((sum, order) => sum + order.priceForAll, 0);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        if (err.status === 401) {
          // אם יש שגיאת אימות, נווט חזרה לדף ההתחברות
          this.router.navigateByUrl('login');
        }
      }
    });
  }

  // ngOnInit(): void {

    
  //   this.orderRoomService.getOrderRoomServiceByCustumer().subscribe(res => {
  //     this.ordersForCustumer = res;
  //    for (let index = 0; index < this.ordersForCustumer.length; index++) {
  //     this.priceForAll += this.ordersForCustumer[index].priceForAll;
     
  //    }
  //   })


  // }








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
