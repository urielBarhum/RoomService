import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderHotel } from '../models/orderHotel';
import { CustumersAndOrdersHotels } from '../models/custumersAndOrdersHotels';
@Injectable({
  providedIn: 'root'
})
export class OrderHotelService {

  constructor(private http:HttpClient) {

  }
  getOrderHotel() :Observable<orderHotel[]>{
   return this.http.get<orderHotel[]>('https://localhost:44382/api/OrderesHotels/GetOrderesHotels')
  }
 addOrderHotel(orderHotel:orderHotel) {
  return this.http.post<CustumersAndOrdersHotels[]> ('https://localhost:44382/api/OrderesHotels/AddOrderHotel', orderHotel)
 }
}
