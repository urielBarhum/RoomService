import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    this.employeeService.deleteEmployee(employeeID).subscribe(
      res =>{
        this.employees= res
      }
    )
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
    newEmployee.firstName = "Uriel";
    newEmployee.lastName = "Barhum";
    newEmployee.isWorkNow = true;
    newEmployee.isBusy = false;
    newEmployee.tzEmployee = "123456789";
    newEmployee.passWord = "1234";
    newEmployee.isManger = true;
    newEmployee.fullName = newEmployee.firstName + " " + newEmployee.lastName;

    console.log(newEmployee); // Output the newly created
    this.employeeService.addEmployee(newEmployee).subscribe(
      res =>{

        let exsistItem = this.employees.find(element => {
          return element.tzEmployee === newEmployee.tzEmployee;
        });
        console.log(exsistItem);
        
        if (exsistItem == undefined || exsistItem == null) {
          this.employees.push(newEmployee);
        }
      }
        )
  }
}
