import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-table-order-room-service',
  templateUrl: './table-order-room-service.component.html',
  styleUrls: ['./table-order-room-service.component.scss']
})
export class TableOrderRoomServiceComponent implements OnInit {


  orders: Order[] = [];

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  updateStatus(order: Order, statusId: number): void {
    this.orderService.updateOrderStatus(order.IDOrderRoomService, statusId).subscribe(
      () => {
        order.StatusID = statusId;
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );
  }
}

