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
  deleteEmployee(idEmployee: number) {

    this.http.delete('https://localhost:44382/api/employee/deleteEmployee/{idEmployee}', {
      body: idEmployee
    }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addEmployee(newEmployee: employee) {
    console.log(newEmployee);

    this.http.post('https://localhost:44382/api/employee/addNewEmployee', newEmployee)
      .subscribe(
        (response) => {
          console.log('הוספת עובד צלחה:', response);
        },
        (error) => {
          console.error('שגיאה בהוספת עובד:', error);
        }
      );
  }
}
