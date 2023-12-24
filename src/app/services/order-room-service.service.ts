import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderRoomService } from '../models/orderRoomService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderRoomServiceService {

  constructor(private http: HttpClient , private router: Router) {

  }
  token: string =""
  getOrdersRoomServices(): Observable<orderRoomService[]> {
    return this.http.get<orderRoomService[]>('https://localhost:44382/api/OrderRoomServic/GetOrderRoomService')
  }
  addOrderRoomService (productID : number) : Observable<string>{
    return this.http.post('https://localhost:44382/api/OrderRoomServic/AddOrderRoomService' , productID ,{ responseType: "text" })
  }

}
