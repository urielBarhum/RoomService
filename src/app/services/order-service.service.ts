import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private apiUrl = 'https://localhost:44382/api/OrderRoomService/GetordersForEmlpoyee';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // updateOrderStatus(orderId: number, statusId: number): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${orderId}/status`, { statusId });
  // }
}
