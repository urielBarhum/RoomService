import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {

   }
   getEmployees() :Observable<employee[]>{
    return this.http.get<employee[]>('https://localhost:44382/api/employee/getemployees')
   }
}
