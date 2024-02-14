import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  pass1: string="";
  pass2: string=""



  employeeForm = new FormGroup({
    tzEmployee: new FormControl(''),
    idHotel: new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    isWorkNow: new FormControl(''),
    isBusy: new FormControl(''),
    password: new FormControl('', [Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.minLength(4)]),
    isManger: new FormControl('')
  });

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
      res => {
        this.employees = res
      }
    )
  }
  openForm() {
    this.add = true;
  }
  addOne() {
    this.add != this.add;
  }

  addEmployee() {
    let newEmployee: employee = new employee();

    this.add = false;
    console.log(this.employeeForm);
    if (this.employeeForm.valid) {







    }

    // newEmployee.idHotel = 1;
    // newEmployee.firstName = "Uriel";
    // newEmployee.lastName = "Barhum";
    // newEmployee.isWorkNow = true;
    // newEmployee.isBusy = false;
    // newEmployee.tzEmployee = "123456789";
    // newEmployee.passWord = "1234";
    // newEmployee.isManger = true;
    // newEmployee.fullName = newEmployee.firstName + " " + newEmployee.lastName;

    // console.log(newEmployee); // Output the newly created
    // this.employeeService.addEmployee(newEmployee).subscribe(
    //   res =>{

    //     let exsistItem = this.employees.find(element => {
    //       return element.tzEmployee === newEmployee.tzEmployee;
    //     });
    //     console.log(exsistItem);

    //     if (exsistItem == undefined || exsistItem == null) {
    //       this.employees.push(newEmployee);
    //     }
    //   }
    //     )
  }
}
