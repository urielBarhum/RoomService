import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Custumer } from '../models/custumer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustumerService {

  constructor(private http:HttpClient) {

   }
   custumeres!:Custumer[]

   getCustumers() :void{
     this.http.get<Custumer[]>('https://localhost:44382/api/Custumer/GetCustumers').subscribe(custumer => {
      this.custumeres = custumer;
     })
   }
}
