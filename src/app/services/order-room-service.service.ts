import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderRoomService } from '../models/orderRoomService';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OrdersForCustumer } from '../models/ordersForCustumer';

@Injectable({
  providedIn: 'root'
})
export class OrderRoomServiceService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  token: string = ""
  getOrdersRoomServices(): Observable<orderRoomService[]> {
    return this.http.get<orderRoomService[]>('https://localhost:44382/api/OrderRoomService/GetOrderRoomService')
  }
  addOrderRoomService(productID: number): Observable<string> {
    return this.http.post                    ('https://localhost:44382/api/OrderRoomService/AddOrderRoomService', productID, { responseType: "text" })
  }

  getOrderRoomServiceByCustumer() :Observable <OrdersForCustumer[]>{
    return this.http.post<OrdersForCustumer[]>('https://localhost:44382/api/OrderRoomService/getOrderRoomServiceByCustumer',this.authService.custumerIdForGetOrder)
  }

 
}
