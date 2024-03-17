import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Custumer } from '../models/custumer';
import { Observable } from 'rxjs';
import { CustumersAndOrdersHotels } from '../models/custumersAndOrdersHotels';

@Injectable({
  providedIn: 'root'
})
export class CustumerService {

  constructor(private http: HttpClient) {

  }
  custumeres!: Custumer[]
  getCusrumers() : Observable<Custumer[]>{
    return this.http.get<Custumer[]>('https://localhost:44382/api/Custumer/GetCustumers')
   }
   getCustumersAndOrdersHotels(): Observable<CustumersAndOrdersHotels[]>{
    return this.http.get<CustumersAndOrdersHotels[]>('https://localhost:44382/api/Custumer/GetCustomerWithOrders')
  }
  addCustumer(custumer:Custumer) :Observable<CustumersAndOrdersHotels[]>{
    return this.http.post<CustumersAndOrdersHotels[]> ('https://localhost:44382/api/Custumer/AddCustumer' ,custumer)
  }
}
