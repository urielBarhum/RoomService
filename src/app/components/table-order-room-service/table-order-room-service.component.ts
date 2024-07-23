import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { orderRoomService } from 'src/app/models/orderRoomService';
import { orderRoomServiceForManger } from 'src/app/models/orderRoomServiceForManger';
import { OrderRoomServiceService } from 'src/app/services/order-room-service.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-table-order-room-service',
  templateUrl: './table-order-room-service.component.html',
  styleUrls: ['./table-order-room-service.component.scss']
})
export class TableOrderRoomServiceComponent implements OnInit, OnDestroy {


  orderRoomServiceForManger: orderRoomServiceForManger[] = [];
  private intervalId: any;

  constructor(private orderRoomServiceService: OrderRoomServiceService) { }

  ngOnInit(): void {
    this.orderRoomServiceService.getOrdersRoomServicesForManger().subscribe(
      res => {
        this.orderRoomServiceForManger = res;
      }
    )
    this.intervalId = setInterval(() => {
      this.reloadPage();
    }, 20000); // 60000 מילישניות = 1 דקה
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  reloadPage(): void {
    // ניתן לרענן את הדף על ידי ניווט לדף הנוכחי
    window.location.reload();
  }



  updateStatus(orderRoomServiceForManger: orderRoomServiceForManger): void {
    debugger
    this.orderRoomServiceService.updateOrderStatus(orderRoomServiceForManger).subscribe(
      res => {
        this.orderRoomServiceForManger = res
      }
    );
  }
}

