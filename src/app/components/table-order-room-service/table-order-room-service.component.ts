import { Component, OnInit } from '@angular/core';
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
export class TableOrderRoomServiceComponent implements OnInit {


  orderRoomServiceForManger: orderRoomServiceForManger[] = [];

  constructor(private orderRoomServiceService: OrderRoomServiceService) { }

  ngOnInit(): void {
    this.orderRoomServiceService.getOrdersRoomServicesForManger().subscribe(
      res =>{
        this.orderRoomServiceForManger = res;
      }
    )
  }



  updateStatus(orderRoomServiceForManger:orderRoomServiceForManger): void {
    debugger
    this.orderRoomServiceService.updateOrderStatus(orderRoomServiceForManger).subscribe(
     res=>{
      this.orderRoomServiceForManger = res
     }
    );
  }
}

