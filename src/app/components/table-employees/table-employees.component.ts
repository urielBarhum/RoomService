import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Observable } from 'rxjs';
import { employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table-employees',
  templateUrl: './table-employees.component.html',
  styleUrls: ['./table-employees.component.scss']
})
export class TableEmployeesComponent implements OnInit {
  erorSaveMaseeg: Message[] = [{ severity: 'error', summary: 'שגיאה בעת הוספת המוצר לחנות ' }];
  successSaveMaseeg: Message[] = [{ severity: 'success', summary: 'העובד נוסף בהצלחה לרשימת העובדים ' }];
  erorEditMaseeg: Message[] = [{ severity: 'error', summary: 'שגיאה בעת עריכת המוצר ' }];
  successEditMaseeg: Message[] = [{ severity: 'success', summary: 'המוצר נערך מחדש בהצלחה ' }];

  erorAddEmployee: boolean = false;
  erorEditEmployee: boolean = false;
  successEditEmployee: boolean = false;
  successSaveEmployee: boolean = false;
  edit: boolean = false;
  employees: employee[] = []
  add: boolean = false;
  IsMangerToEdit: boolean = false
  employee: employee = new employee();
  pass1: string = "";
  pass2: string = ""
  employeeIsManger: boolean = false;
  employeeIsWork: boolean = false;
  employeeIsBusy: boolean = false;


  employeeForm = new FormGroup({
    tzEmployee: new FormControl('', [Validators.required, Validators.minLength(2)]),
    idHotel: new FormControl(0, [Validators.required, Validators.min(1)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    isWorkNow: new FormControl(false),
    isBusy: new FormControl(false),
    password: new FormControl('', [Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.minLength(4)]),
    isManger: new FormControl(false)
  });


  employeeFormToEdit = new FormGroup({

    tzEmployee: new FormControl('', [Validators.required, Validators.minLength(2)]),
    idHotel: new FormControl(0, [Validators.required, Validators.min(1)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    isWorkNow: new FormControl(false),
    isBusy: new FormControl(false),
    password: new FormControl('', [Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.minLength(4)]),
    isManger: new FormControl(false)
  });


  constructor(private employeeService: EmployeeService, private router: Router) { }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res
      console.log(res);

    }

    )
  }
  isMangerAdmin() {
    this.employeeIsManger = !this.employeeIsManger
  }


  editEmployee(employee: employee) {
    this.employeeFormToEdit.patchValue(employee)
    this.edit = true;
    if (employee.isManger) {

      this.IsMangerToEdit = true;
    }
  }
  saveChanges() {

    this.IsMangerToEdit = false;
    if (this.employeeFormToEdit.valid) {
      const objEmployee = this.employeeFormToEdit.getRawValue()
      const employeeToSave = new employee();
      
      employeeToSave.idHotel = objEmployee.idHotel!
      employeeToSave.firstName = objEmployee.firstName!
      employeeToSave.lastName = objEmployee.lastName!
      employeeToSave.isWorkNow = objEmployee.isWorkNow!
      employeeToSave.isBusy = objEmployee.isBusy!
      employeeToSave.tzEmployee = objEmployee.tzEmployee!
      employeeToSave.isManger = objEmployee.isManger!
      if(employeeToSave.isManger == true){
        if(  objEmployee.password != null &&   objEmployee.passwordConfirm != null &&  objEmployee.passwordConfirm==objEmployee.password ){

          employeeToSave.passWord = objEmployee.password!
          
        }
      }
      this.employeeService.editEmployee(employeeToSave).subscribe( res =>{
        this.employees = res;
        
      })
    }



    this.edit = false;
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
  openFormToEdit() {
    this.edit = true;
  }
  addOne() {
    this.add != this.add;
  }

  addEmployee() {
    debugger;
    console.log(this.employeeIsManger);

    this.add = false;
    console.log(this.employeeForm);
    if (this.employeeForm.valid) {

      const objemployee = this.employeeForm.getRawValue()
      const EmployeeToAdd = new employee();

      EmployeeToAdd.idHotel = objemployee.idHotel!;
      EmployeeToAdd.firstName = objemployee.firstName!;
      EmployeeToAdd.lastName = objemployee.lastName!;
      EmployeeToAdd.fullName = EmployeeToAdd.firstName + " " + EmployeeToAdd.lastName;
      EmployeeToAdd.isWorkNow = objemployee.isWorkNow ?? false;
      EmployeeToAdd.isBusy = objemployee.isBusy ?? false;
      EmployeeToAdd.tzEmployee = objemployee.tzEmployee!;
      if (this.employeeIsManger === true) {
        EmployeeToAdd.isManger = true;
        if (objemployee.password != objemployee.passwordConfirm) {
          return;
        }
        EmployeeToAdd.passWord = objemployee.password!;
      }
      else {
        EmployeeToAdd.isManger = false
      }
      console.log(EmployeeToAdd); // Output the newly created

      this.employeeService.addEmployee(EmployeeToAdd).subscribe(
        res => {
          this.employees = res
          this.successSaveEmployee = true;

          this.employeeIsManger = false;
          this.employeeForm = new FormGroup({
            tzEmployee: new FormControl('', [Validators.required, Validators.minLength(2)]),
            idHotel: new FormControl(0, [Validators.required, Validators.min(1)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            isWorkNow: new FormControl(false),
            isBusy: new FormControl(false),
            password: new FormControl('', [Validators.minLength(4)]),
            passwordConfirm: new FormControl('', [Validators.minLength(4)]),
            isManger: new FormControl(false)
          });


          setTimeout(() => {
            this.successSaveEmployee = false;

          }, 5000);
        }
      )
    }
  }
}
