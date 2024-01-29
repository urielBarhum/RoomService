import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.scss']
})
export class TableEmployeesComponent implements OnInit {
  employees: employee[] = []
  add: boolean = false;
  employee: employee = new employee();
  constructor(private employeeService: EmployeeService, private router: Router) { }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res
      console.log(res);

    }

    )
  }
  editEmployee() {

  }
  deleteEmployee(employeeID: number) {
    this.employeeService.deleteEmployee(employeeID)
  }
  addOne() {
    this.add != this.add;
  }
  submitForm() {

  }
  kuku() {
    let newEmployee: employee = new employee();

    // Assign values to its properties

    newEmployee.idHotel = 1;
    newEmployee.firstName = "John";
    newEmployee.lastName = "Doe";
    newEmployee.isWorkNow = true;
    newEmployee.isBusy = false;
    newEmployee.tzEmployee = "123456789";
    newEmployee.passWord = "password123";
    newEmployee.isManger = false;
    newEmployee.fullName = newEmployee.firstName + " " + newEmployee.lastName;

    console.log(newEmployee); // Output the newly created
    this.employeeService.addEmployee(newEmployee);

    // לבדוק אם יעיל
    let exsistItem = this.employees.find(element => {
      return element.tzEmployee === newEmployee.tzEmployee;
    });
    console.log(exsistItem);
    
    if (exsistItem == undefined || exsistItem == null) {
      this.employees.push(newEmployee);
    }
  }
}
