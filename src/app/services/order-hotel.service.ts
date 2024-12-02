import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderHotel } from '../models/orderHotel';
import { CustumersAndOrdersHotels } from '../models/custumersAndOrdersHotels';
import { editOrder } from '../models/editOrder';
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
 editOrderHotel(orderToEdit:editOrder) :Observable<CustumersAndOrdersHotels[]>{
  return this.http.put<CustumersAndOrdersHotels[]>('https://localhost:44382/api/OrderesHotels/EditOrder' ,orderToEdit)
 }
 GetAvailableRooms(dateFrom:Date,dateTo:Date ,floorCustumerChuse:number):Observable<number[]>{
  const params = new HttpParams()
    .set('dateFrom', dateFrom.toISOString())
    .set('dateTo', dateTo.toISOString())
    .set('floorCustumerChuse',floorCustumerChuse)
    ;
  return this.http.get<number[]> ('https://localhost:44382/api/OrderesHotels/GetAvailableRooms',{params})
 }
}
