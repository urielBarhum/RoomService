import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderRoomService } from '../models/orderRoomService';

@Injectable({
  providedIn: 'root'
})
export class OrderRoomServiceService {

  constructor(private http: HttpClient) {

  }
  getORS(): Observable<orderRoomService[]> {
    return this.http.get<orderRoomService[]>('https://localhost:44382/api/OrderRoomServic/GetORS')
  }
}
