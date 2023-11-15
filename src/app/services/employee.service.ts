import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {

   }
   getEmployees() :Observable<Employee[]>{
    return this.http.get<Employee[]>('https://localhost:44382/api/employee/getemployees')
   }
}
