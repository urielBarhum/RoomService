import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }
  getHotels() : Observable<Hotel[]>{
return this.http.get<Hotel[]>('kjjoiioj')
  }
}
