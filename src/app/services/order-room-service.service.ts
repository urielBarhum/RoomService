import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private baseUrl = 'https://localhost:44382/api/OrderRoomService';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  getOrdersRoomServices(): Observable<orderRoomService[]> {
    return this.http.get<orderRoomService[]>(`${this.baseUrl}/GetOrderRoomService`, { headers: this.getHeaders() });
  }

  addOrderRoomService(productID: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/AddOrderRoomService`, productID, { 
      headers: this.getHeaders(),
      responseType: "text" 
    });
  }

  getOrderRoomServiceByCustumer(): Observable<OrdersForCustumer[]> {
    return this.http.post<OrdersForCustumer[]>(
      `${this.baseUrl}/getOrderRoomServiceByCustumer`,this.authService.custumerIdForGetOrder,
      { headers: this.getHeaders() }
    );
  }
  
  ishurKabala(Orderid: number): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/updateStatusById`,
      Orderid,
      { headers: this.getHeaders() }
    );
  }
}