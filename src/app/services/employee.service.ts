import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {

  }
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>('https://localhost:44382/api/employee/getemployees')
  }
  deleteEmployee(idEmployee: number) : Observable<employee[]>{

    return this.http.delete<employee[]>('https://localhost:44382/api/employee/deleteEmployee/'+idEmployee)
  }
  addEmployee(newEmployee: employee) :Observable<employee[]> {
    console.log(newEmployee);
   return this.http.post<employee[]>('https://localhost:44382/api/employee/addNewEmployee', newEmployee)
      
  }
  editEmployee(employeeToEdit : employee) :Observable <employee[]>{
    return this.http.put<employee[]> ('https://localhost:44382/api/employee/EditEmloyee',employeeToEdit);
  }





}
